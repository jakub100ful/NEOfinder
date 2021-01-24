import React, { Component } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';
import OrbitControlsView from '../OrbitControlsView';

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

global.THREE = global.THREE || THREE;

export default class OrbitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orbitData: null,
      error: null,
      width: this.props.width,
      height: this.props.height,
      camera: null
    };
  }



  _onGLContextCreate = async gl => {
    
    // Defining the scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(120, this.state.width/this.state.height, 0.1, 1000);
    camera.position.set(50, 50, 70);
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
      new THREE.MeshBasicMaterial({map: await ExpoTHREE.loadAsync(require("../../assets/earth-texture.jpg"))})
    )
    star.castShadow = false;

    // EARTH
    
    let planetGeom = new THREE.Mesh(
      new THREE.SphereBufferGeometry(5, 3, 10),
      new THREE.MeshBasicMaterial({map: await ExpoTHREE.loadAsync(require("../../assets/asteroid-texture-1.jpg"))})
    ),
    planet = new THREE.Object3D();

    planet.add(planetGeom);

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
        transparent: false,
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
    //     oX = q.x * this.state.width,
    //     oY = q.y * this.state.height,
    //     size = Math.random() < .9998 ? Math.random() : Math.random() * 3;
    // }


    
    scene.add(star);
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );


    camera.lookAt(star.position);


    function update() {
      star.rotation.y += 0.0025;
      planet.rotation.y += 0.0025;
    }

    const render = () => {
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  render() {
    return(  
          <GLView style={{ width: "100%", height: "100%", backgroundColor: "black", flex: 8 }} onContextCreate={this._onGLContextCreate} />

    )
  }
}
