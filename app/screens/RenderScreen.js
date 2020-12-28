import Expo from "expo";
import React, { Component } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three"

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

export default class RenderScreen extends Component {  
    render() {    
       return(
          <Expo.GLView           
          style={{ flex: 1 }}           
          onContextCreate={this._onGLContextCreate}/>    
          )
      }
}
_onGLContextCreate = async (gl) => {
    // Here is where we will define our scene, camera and renderer

    // 1. Scene
    var scene = new THREE.Scene(); 
    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
    75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    // 3. Renderer
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  }

export default RenderScreen;