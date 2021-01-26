import React from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';
import { useState } from "react/cjs/react.development";
import { Text } from "react-native";
import * as NEOGenerate from '../functions/generateNEOShapeData';


global.THREE = global.THREE || THREE;

/**
 * Renders graphical preview of a NEO object in a view
 * @prop {object} NEO - NEO object to be displayed
 */
export default function NEORenderPreview(props) {

  // THREE Primary State Initialisers
  const [scene, setScene] = useState(new THREE.Scene());
  const [asteroid, setAsteroid] = useState(new THREE.Object3D())
  const [asteroidShape, setAsteroidShape] = useState(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(NEOGenerate.getSize(props.NEO), 0),
      new THREE.MeshLambertMaterial({
        color: NEOGenerate.getColour(),
      })
    ));
  const [light, setLight] = useState(new THREE.PointLight(0xFFFFFF, 2, 0, 0)); 

  // Update Function - Shapes to be animated
  const update = () => {
    asteroidShape.rotation.y += 0.005;
    asteroidShape.rotation.x += 0.005;
  }

  /**
   * Draws the scene
   * @param {object} gl - Graphics library context
   */
  const _onGLContextCreate = async gl => {
    let camera = new THREE.PerspectiveCamera(
      75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000
    );
    let renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    
    // Adding to scene
    asteroid.add(asteroidShape);
    scene.add(asteroid);
    light.position.set(0, 0, 20);
    scene.add(light);
    camera.position.set(0, 0, 10);

    const render = () => {
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    if (asteroid.rotation.y < 10){
      render();
    }
  };

  // Ensure props are loaded before rendering
  if (props.NEO){
    return(  
      <GLView style={{ flex: 1, backgroundColor: "black" }} onContextCreate={_onGLContextCreate} />
  
    )
  }else{
    return(
      <Text>Loading Shape Data...</Text>
    )
  }

  
}
