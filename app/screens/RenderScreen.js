import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { Dimensions, View, Text } from 'react-native';
import React, { Component } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';


// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

global.THREE = global.THREE || THREE;

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, windowWidth/windowHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(windowWidth, windowHeight);

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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, this.state.windowWidth/this.state.windowHeight, 0.1, 1000);
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(this.state.windowWidth, this.state.windowHeight);
  
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const material = new THREE.MeshBasicMaterial({
    //   map: await ExpoTHREE.createTextureAsync({
    //     asset: Asset.fromModule(require("../../assets/panorama.png"))
    //   })
    // });
    const sphere = new THREE.Mesh(geometry, material);    
    scene.add(sphere);
    camera.position.z = 5;
    const render = () => {
      requestAnimationFrame(render);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
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

              console.log(responseJson);
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
      <GLView style={{ width: 300, height: 300 }} onContextCreate={this._onGLContextCreate} />
      </View>
    )
  }
}
