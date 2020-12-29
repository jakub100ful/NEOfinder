import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { Dimensions, View, Text } from 'react-native';
import React, { Component } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

global.THREE = global.THREE || THREE;

export default class RenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spk: this.props.route.params.spk,
      orbitData: null,
      error: null,
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height
    };
  }

  _onGLContextCreate = async gl => {
    
    // Defining the scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(120, this.state.windowWidth/this.state.windowHeight, 0.1, 1000);
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    //Objects

    // SUN
    let starColor = (function() {
      let colors = [0xFFFF00, 0x559999, 0xFF6339, 0xFFFFFF];
      return colors[Math.floor(Math.random() * colors.length)];
    })(),

    star = new THREE.Mesh(
      new THREE.SphereBufferGeometry(20, 32, 32),
      new THREE.MeshBasicMaterial({map: await ExpoTHREE.loadAsync(require("../../assets/sun-texture.jpg"))})
    ),
    glows = [];

    star.castShadow = false;

    // EARTH
    
    let planetGeom = new THREE.Mesh(
      new THREE.SphereBufferGeometry(5, 32, 32),
      new THREE.MeshBasicMaterial({map: await ExpoTHREE.loadAsync(require("../../assets/earth-texture.jpg"))})
    ),
    planet = new THREE.Object3D();

    planet.add(planetGeom);

    // if (type > 1 && Math.random() > 0.5) {
    //   var atmoGeom = new THREE.Mesh(
    //     new THREE.SphereBufferGeometry(5, 32, 32),
    //     new THREE.MeshLambertMaterial({
    //       color: planetColors[3],
    //       shading: THREE.FlatShading,
    //       transparent: true,
    //       opacity: 0.5
    //     })
    //   );

    //   atmoGeom.castShadow = false;
    //   planet.add(atmoGeom);
    // }

    planet.orbitRadius = 50 + 50 + 0;
    planet.rotSpeed = 0.005 + 0.01;
    planet.rot = Math.random();
    planet.orbitSpeed = (0.02 - 0 * 0.0048) * 0.25;
    planet.orbit = Math.random() * Math.PI * 2;
    planet.position.set(planet.orbitRadius, 0, 0);

    var orbit = new THREE.Line(
      new THREE.CircleGeometry(planet.orbitRadius, 90),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: .05,
        side: THREE.BackSide
      })
    );
    orbit.geometry.vertices.shift();
    orbit.rotation.x = THREE.Math.degToRad(90);
    scene.add(orbit);

    let radii = planet.orbitRadius + 0;
    scene.add(planet);

    //Lights
    let light1 = new THREE.PointLight(starColor, 2, 0, 0);

    light1.position.set(0, 0, 0);
    scene.add(light1);

    let light2 = new THREE.AmbientLight(0x090909);
    scene.add(light2);

    // for (let s in bgStars) {
    //   let q = bgStars[s],
    //     oX = q.x * this.state.windowWidth,
    //     oY = q.y * this.state.windowHeight,
    //     size = Math.random() < .9998 ? Math.random() : Math.random() * 3;
    // }


    
    scene.add(star);
    camera.position.set(0, 20, 150);
    const render = () => {
      requestAnimationFrame(render);
      star.rotation.y += 0.0025;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };


  componentDidMount(){
    if(this.state.orbitData == null){
      fetch(`https://ssd-api.jpl.nasa.gov/sbdb.api?spk=${this.state.spk}&cd-epoch=1`)
            .then((response) => response.json())
            .then((responseJson) => {
            // Unloading payload depending on a successful call.

                if (responseJson.orbit){
                    const orbitDataResponse = responseJson.orbit;
                    this.setState({orbitData: orbitDataResponse});
                }else{
                    this.setState({error: "Unable to fetch orbit data at this moment. Please try later or restart the app."});
                }
            // Error Handling
            }).catch((er) => {
                this.setState({error: er});
            })
    
            if(this.state.error){
                console.log(this.state.error);
            }
    }
  }


  render() {
    return(

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView style={{ width: "100%", height: "100%", backgroundColor: "black" }} onContextCreate={this._onGLContextCreate} />
      </View>
    )
  }
}
