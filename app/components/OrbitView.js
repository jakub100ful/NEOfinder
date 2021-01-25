import React, { useContext } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';
import { useEffect, useState } from "react/cjs/react.development";
import { UserContext } from '../provider/UserProvider';
import fetchNEOOrbitData from '../functions/fetchNEOOrbitData';
import { Text } from "react-native";
import * as NEOGenerate from '../functions/generateNEOShapeData';
import fetchNEOFavourites from '../functions/fetchNEOFavourites';

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

global.THREE = global.THREE || THREE;

export default function OrbitView(props) {
  const user = useContext(UserContext);

  // THREE Primary State Initialisers
  const [scene, setScene] = useState(new THREE.Scene());

  const [earthShape, setEarthShape] = useState(
      new THREE.Mesh(new THREE.SphereBufferGeometry(10, 8, 8), 
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
    console.log("Asteroid list length:",asteroidList.length);

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
    orbitData = asteroidOrbitDataList,
    radii = 0;

    orbitData.forEach((NEO, index) => {
        let size = 5,
          type = Math.floor(Math.random() * planetColors.length),
          roughness = 0,
          planetGeom = new THREE.Mesh(
            new THREE.IcosahedronGeometry(size, roughness),
            new THREE.MeshLambertMaterial({
              color: planetColors[type],
            })
          ),
          planet = new THREE.Object3D();
      
        planet.add(planetGeom);
      
        if (type > 1 && Math.random() > 0.5) {
          let atmoGeom = new THREE.Mesh(
            new THREE.IcosahedronGeometry(size + 1.5, roughness),
            new THREE.MeshLambertMaterial({
              color: planetColors[3],
              transparent: true,
              opacity: 1
            })
          );
      
          atmoGeom.castShadow = false;
          planet.add(atmoGeom);
        }
      
        planet.orbitRadius = Math.random() * 50 + 50 + radii;
        planet.rotSpeed = 0.005 + Math.random() * 0.01;
        planet.rotSpeed *= Math.random() < .10 ? -1 : 1;
        planet.rot = Math.random();
        planet.orbitSpeed = (0.02 - index * 0.0048) * 0.25;
        planet.orbit = Math.random() * Math.PI * 2;
        planet.position.set(planet.orbitRadius, 0, 0);
      
        radii = planet.orbitRadius + size;
        asteroidList.push(planet);
        scene.add(planet);
      
        let orbit = new THREE.Line(
          new THREE.CircleGeometry(planet.orbitRadius, 90),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1,
            side: THREE.BackSide
          })
        );
        orbit.geometry.vertices.shift();
        orbit.rotation.x = THREE.Math.degToRad(90);
        scene.add(orbit);
    })
    console.log(asteroidList.length);
    setAsteroidShapeDataList(asteroidList);
  }

  
  // Fetch orbit data
  useEffect(() => {
    fetchAsteroidOrbitData();
  },[])

  // Generate shape data
  useEffect(() => {
    if(asteroidShapeDataList == null && asteroidOrbitDataList != null){
      console.log("Shape data initialised")
      initialiseAsteroidShapeData();
    }
  }, [asteroidOrbitDataList])

  // Update Function - Shapes to be animated
  const update = () => {
    earthShape.rotation.y += 0.01;

    for (let p in asteroidShapeDataList) {
      let planet = asteroidShapeDataList[p];
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
    light.position.set(0, 0, 0);
    scene.add(light);
    camera.position.set(0, 20, 250);

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
