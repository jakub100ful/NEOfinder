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
      windowHeight: Dimensions.get('window').height,
      star: new THREE.Mesh(
        new THREE.SphereBufferGeometry(20, 32, 32),
        new THREE.MeshBasicMaterial({map: ExpoTHREE.loadAsync(require("../../assets/sun-texture.jpg"))}),
      ),
      planetGeom: new THREE.Mesh(
        new THREE.SphereBufferGeometry(5, 32, 32),
        new THREE.MeshBasicMaterial({map: ExpoTHREE.loadAsync(require("../../assets/earth-texture.jpg"))})
      ),
      planet: new THREE.Object3D(),
      orbit: new THREE.Line(
        new THREE.CircleGeometry(100, 90),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: .05,
          side: THREE.BackSide
        })
      ),
      light1: new THREE.PointLight(0x090909, 2, 0, 0)
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
    this.state.star.castShadow = false;

    // EARTH

    this.state.planet.add(this.state.planetGeom);
    this.state.planet.orbitRadius = 50 + 50 + 0;
    this.state.planet.rotSpeed = 0.005 + 0.01;
    this.state.planet.rot = Math.random();
    this.state.planet.orbitSpeed = (0.02 - 0 * 0.0048) * 0.25;
    this.state.planet.orbit = Math.random() * Math.PI * 2;
    this.state.planet.position.set(this.state.planet.orbitRadius, 0, 0);

    this.state.orbit.geometry.vertices.shift();
    this.state.orbit.rotation.x = THREE.Math.degToRad(90);

    //Lights
    this.state.light1.position.set(0, 0, 0);

    scene.add(this.state.orbit);
    scene.add(this.state.planet);
    scene.add(this.state.light1);
    scene.add(this.state.star);
    camera.position.set(0, 20, 150);

    const render = () => {
      requestAnimationFrame(render);
      this.state.star.rotation.y += 0.0025;
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
