import React, { useContext } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';
import { useEffect, useState } from "react/cjs/react.development";
import { UserContext } from '../provider/UserProvider';
import fetchNEOOrbitData from '../functions/fetchNEOOrbitData';
import { Text } from "react-native";
import generateNEOShapeData from '../functions/generateNEOShapeData';

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

global.THREE = global.THREE || THREE;

export default function NEORenderPreview(props) {
  const user = useContext(UserContext);

  // THREE Primary State Initialisers
  const [scene, setScene] = useState(new THREE.Scene());
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  const [earthShape, setEarthShape] = useState(
      new THREE.Mesh(new THREE.SphereBufferGeometry(20, 8, 8), 
      new THREE.MeshBasicMaterial( { color: 0x1bb3fa } ))
  );
  const [light, setLight] = useState(new THREE.PointLight(0xFFFFFF, 2, 0, 0)); 

  // State for storing a list of the shape data for all favourited asteroids
  const [asteroidOrbitDataList, setAsteroidOrbitDataList] = useState(null);
  const [asteroidShapeDataList, setAsteroidShapeDataList] = useState(null);

  // Fetch Orbit Data

  
  // Fetch Asteroid Orbit Data
  const fetchAsteroidOrbitData = async () => {
    let tempList = [];
    let asteroidList = [...user.NEOFavouritesList];

    for (const NEOid of asteroidList) {
      let orbitData = await fetchNEOOrbitData(NEOid);
      tempList.push(orbitData);
    }

    setAsteroidOrbitDataList(tempList);
  }

  // Asteroid Shape Data Initialiser
  const initialiseAsteroidShapeData = () => {
    let asteroidList = [],
    planetColors = [
      0x999999, // pale grey
      0x777777, // light grey
      0x555555, // grey 
      0x333333, // space grey
      0x111111 //dark grey
    ],
    orbitData = asteroidOrbitDataList

    orbitData.forEach((NEO, index) => {
        const shapeData = generateNEOShapeData(NEO);
        asteroidList.push(shapeData[0])

        // Adding the asteroid and orbit line to scene
        scene.add(shapeData[0])
        scene.add(shapeData[1])
    })
    setAsteroidShapeDataList(asteroidList);
  }

  
  // Fetch orbit data
  useEffect(() => {
    fetchAsteroidOrbitData();
  },[])

  // Generate shape data
  useEffect(() => {
    if(asteroidShapeDataList == null && asteroidOrbitDataList != null){
      initialiseAsteroidShapeData();
    }
  }, [asteroidOrbitDataList])

  // Update Function - Shapes to be animated
  const update = () => {
    earthShape.rotation.y += 0.01;

    for (let p in asteroidShapeDataList) {
      let planet = asteroidShapeDataList[p];
      let inclination = planet.inclination;

      planet.rot += planet.rotSpeed;
      planet.rotation.set(0, planet.rot, 0);
      planet.orbit += planet.orbitSpeed;
      planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
    }
  }

  const _onGLContextCreate = async gl => {
    let camera = new THREE.PerspectiveCamera(
      75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000
    );
    let renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    

    // Adding to scene
    scene.add(earthShape);
    light.position.set(0, 0, -50);
    scene.add(light);
    camera.position.set(0, 0, 50);

    const render = () => {
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    if (earthShape.rotation.y < 10){
      render();
    }
  };

  if (asteroidShapeDataList){
    return(  
          <GLView style={{ width: "100%", height: "100%", flex: 1, backgroundColor: "black" }} onContextCreate={_onGLContextCreate} />
  
    )
  }else{
    return(
      <Text>Loading Shape Data...</Text>
    )
  }

  
}
