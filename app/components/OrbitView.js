import React, { useContext } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';
import { useEffect, useState } from "react/cjs/react.development";
import { UserContext } from '../provider/UserProvider';
import fetchNEOOrbitData from '../functions/fetchNEOOrbitData';
import { Text } from "react-native";
import * as NEOGenerate from '../functions/generateNEOShapeData';

// Three js global variable
global.THREE = global.THREE || THREE;


/**
 * Renders the orbit view of saved NEOs around the Earth
 */
export default function OrbitView() {
  const user = useContext(UserContext);

  // THREE Primary State Initialisers
  const earthSize = 25;
  const [scene, setScene] = useState(new THREE.Scene());
  const [earthShape, setEarthShape] = useState(
      new THREE.Mesh(new THREE.SphereBufferGeometry(earthSize, 8, 8), 
      new THREE.MeshBasicMaterial( { color: 0x1bb3fa } ))
  );
  const [light, setLight] = useState(new THREE.PointLight(0xFFFFFF, 2, 0, 0)); 

  // State for storing a list of the shape data for all favourited asteroids
  const [asteroidOrbitDataList, setAsteroidOrbitDataList] = useState(null);
  const [asteroidShapeDataList, setAsteroidShapeDataList] = useState(null);
  
  // Fetch Asteroid Orbit Data
  const fetchAsteroidOrbitData = async () => {
    let tempList = [];
    let asteroidList = [...user.NEOFavouritesList];

    // Fetches the orbit data for each NEO in favourites
    for (const NEOid of asteroidList) {
      let orbitData = await fetchNEOOrbitData(NEOid);
      tempList.push(orbitData);
    }
    setAsteroidOrbitDataList(tempList);
  }

  // Asteroid Shape Data Initialiser
  const initialiseAsteroidShapeData = () => {
    let asteroidList = [],
    asteroidColors = [
      0x999999, // pale grey
      0x777777, // light grey
      0x555555, // grey 
      0x333333, // space grey
      0x111111 //dark grey
    ],
    orbitData = asteroidOrbitDataList

  /**
   * Creates THREE js objects for each NEO and its orbit line, and adds it to the scene
   */
    for (let NEO of orbitData){

      // Defining visual aspects
      let size = NEOGenerate.getSize(NEO),
        type = Math.floor(Math.random() * asteroidColors.length),
        roughness = 0,
        asteroidGeom = new THREE.Mesh(
          new THREE.IcosahedronGeometry(size, roughness),
          new THREE.MeshLambertMaterial({
            color: asteroidColors[type],
          })
        ),
        asteroid = new THREE.Object3D();
    
      asteroid.add(asteroidGeom);
      
      // Adding atmosphere for better visual appearance
      if (type > 1 && Math.random() > 0.5) {
        let atmoGeom = new THREE.Mesh(
          new THREE.IcosahedronGeometry(size + 1.5, roughness),
          new THREE.MeshLambertMaterial({
            color: asteroidColors[3],
            transparent: true,
            opacity: 1
          })
        );
    
        atmoGeom.castShadow = false;
        asteroid.add(atmoGeom);
      }
    
      // Defining orbital properties
      asteroid.orbitRadius = NEOGenerate.getOrbitRadius(NEO)+earthSize;
      asteroid.rotSpeed = 0.005 + Math.random() * 0.01;
      asteroid.rotSpeed *= Math.random() < .10 ? -1 : 1;
      asteroid.rot = Math.random();
      asteroid.orbitSpeed = NEOGenerate.getVelocity(NEO);
      asteroid.orbit = Math.random() * Math.PI * 2;
      asteroid.position.set(asteroid.orbitRadius, 0, 0);
    
      // Adding asteroid to array for the update function, and to the scene
      asteroidList.push(asteroid);
      scene.add(asteroid);
    
      // Defining the orbit path properties
      let orbit = new THREE.Line(
        new THREE.CircleGeometry(asteroid.orbitRadius, 90),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: .5,
          side: THREE.BackSide
        })
      );
      orbit.geometry.vertices.shift();
      orbit.rotation.x = THREE.Math.degToRad(90);

      // Adding orbit path to scene
      scene.add(orbit);
    }

    // Adding asteroid list to state
    setAsteroidShapeDataList(asteroidList);
  }

  
  // Fetch orbit data
  useEffect(() => {
    fetchAsteroidOrbitData();
  },[user.NEOFavouritesList])

  // Generate shape data
  useEffect(() => {
    if(asteroidShapeDataList == null && asteroidOrbitDataList != null){
      initialiseAsteroidShapeData();
    }
  }, [asteroidOrbitDataList])

  // Update Function - Shapes to be animated
  const update = () => {
    // Rotating the Earth
    earthShape.rotation.y += 0.005;

    // Updating the position of each asteroid
    for (let i in asteroidShapeDataList) {
      let asteroid = asteroidShapeDataList[i];
      asteroid.rot += asteroid.rotSpeed;
      asteroid.rotation.set(0, asteroid.rot, 0);
      asteroid.orbit += asteroid.orbitSpeed;
      asteroid.position.set(Math.cos(asteroid.orbit) * asteroid.orbitRadius, 0, Math.sin(asteroid.orbit) * asteroid.orbitRadius);
    }
    
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
    scene.add(earthShape);
    light.position.set(0, 0, 0);
    scene.add(light);
    camera.position.set(0, 30, 200);

    // Render function - calls updates and renders the objects
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
          <GLView style={{ width: "100%", height: "100%", flex: 1 }} onContextCreate={_onGLContextCreate} />
  
    )
  }else{
    return(
      <Text>Loading Shape Data...</Text>
    )
  }
}
