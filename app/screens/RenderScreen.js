import Expo, { AR } from "expo";
import React from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three"
import { View, Text } from "react-native";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { GraphicsView } from 'expo-graphics';

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

function RenderScreen(props) {

  const [spk, setSpk] = useState(props.route.params.spk);
  const [orbitData, setOrbitData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(orbitData == null){
      fetch(`https://ssd-api.jpl.nasa.gov/sbdb.api?spk=${spk}&cd-epoch=1`)
            .then((response) => response.json())
            .then((responseJson) => {
            // Unloading payload depending on a successful call.

              console.log(responseJson);
                if (responseJson.orbit){
                    const orbitDataResponse = responseJson.orbit;
                    setOrbitData(orbitDataResponse);
                }else{
                    setError("Unable to fetch orbit data at this moment. Please try later or restart the app.");
                }
            // Error Handling
            }).catch((er) => {
                setError(er);
            })
    
            if(error){
                console.log(error);
            }
    }
  })

  // async function _onGLContextCreate (gl) {
  //   // Here is where we will define our scene, camera and renderer

  //   // 1. Scene
  //   var scene = new THREE.Scene(); 
  //   // 2. Camera
  //   const camera = new THREE.PerspectiveCamera(
  //   75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
  //   // 3. Renderer
  //   const renderer = ExpoTHREE.createRenderer({ gl });
  //   renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  // }

  return (
    <View>
      <Text>
        {spk}
      </Text>
      <GraphicsView
      />
      {/* <Expo.GLView           
      style={{ flex: 1 }}           
      onContextCreate={this._onGLContextCreate}/>   */}
    </View>
  );
}

export default RenderScreen;
