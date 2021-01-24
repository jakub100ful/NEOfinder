import React, { useContext } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { GLView } from 'expo-gl';
import { useEffect, useState } from "react/cjs/react.development";
import { UserContext } from '../provider/UserProvider';
import fetchNEOOrbitData from '../functions/fetchNEOOrbitData';

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

global.THREE = global.THREE || THREE;

export default function OrbitView(props) {
  const user = useContext(UserContext);
  const [scene, setScene] = useState(new THREE.Scene());
  const [earthShape, setEarthShape] = useState(
      new THREE.Mesh(new THREE.SphereBufferGeometry(20, 8, 8), 
      new THREE.MeshBasicMaterial( { color: 0x1bb3fa } ))
  );
  // State for storing a list of the shape data for all favourited asteroids
  const [asteroidOrbitDataList, setAsteroidOrbitDataList] = useState(null);
  const [asteroidShapeDataList, setAsteroidShapeDataList] = useState(null);

  // Fetch Orbit Data

  
  // Fetch Asteroid Orbit Data
  const fetchAsteroidOrbitData = () => {
    let tempList = [];
    let asteroidList = [...user.NEOFavouritesList];

    asteroidList.forEach(async (NEOid) => {
      let orbitData = await fetchNEOOrbitData(NEOid);
      tempList.push(orbitData);
      setAsteroidOrbitDataList(tempList);
    })
  }

  // Asteroid Shape Data Initialiser
  const initialiseAsteroidShapeData = () => {
    let asteroidList = [];
    let orbitData = asteroidOrbitDataList;
    let radii = 25;

    orbitData.forEach((NEO, index) => {
      let planet = new THREE.Mesh(new THREE.SphereBufferGeometry(4, 4, 4), 
      new THREE.MeshBasicMaterial( { color: 0x333333 } ))

      planet.orbitRadius = Math.random() * 50 + 50 + radii;
      planet.rotSpeed = 0.005 + Math.random() * 0.01;
      planet.rotSpeed *= Math.random() < .10 ? -1 : 1;
      planet.rot = Math.random();
      planet.orbitSpeed = (0.02 - index * 0.0048) * 0.25;
      planet.orbit = Math.random() * Math.PI * 2;
      planet.position.set(planet.orbitRadius, 0, 70);

      scene.add(planet);
      asteroidList.push(planet);
    })
    setAsteroidShapeDataList(asteroidList);
  }

  

  useEffect(() => {
    fetchAsteroidOrbitData();
  },[])

  useEffect(() => {
    if(asteroidShapeDataList == null && asteroidOrbitDataList != null){
      initialiseAsteroidShapeData();
    }
  }, [asteroidOrbitDataList])

  // Update Function - Shapes to be animated
  const update = () => {
    earthShape.rotation.y += 0.01;

    for (var p in asteroidShapeDataList) {
      let planet = asteroidShapeDataList[p];
      planet.rot += planet.rotSpeed
      planet.rotation.set(0, planet.rot, 0);
      planet.orbit += planet.orbitSpeed;
      planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
    }
  }

  const _onGLContextCreate = async gl => {
    const camera = new THREE.PerspectiveCamera(
      75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000
    );
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Adding to scene
    scene.add(earthShape);
    camera.position.set(0, 0, 300);

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

  return(  
        <GLView style={{ width: "100%", height: "100%", flex: 1 }} onContextCreate={_onGLContextCreate} />

  )
  
}
