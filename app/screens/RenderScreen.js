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
    const camera = new THREE.PerspectiveCamera(120, this.state.windowWidth/this.state.windowHeight, 0.1, 10000);
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(this.state.windowWidth, this.state.windowHeight);

    // let controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 1;
  
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );

    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const material = new THREE.MeshBasicMaterial({
    //   map: await ExpoTHREE.createTextureAsync({
    //     asset: Asset.fromModule(require("../../assets/panorama.png"))
    //   })
    // });

//Objects
let starColor = (function() {
  let colors = [0xFFFF00, 0x559999, 0xFF6339, 0xFFFFFF];
  return colors[Math.floor(Math.random() * colors.length)];
})(),
star = new THREE.Mesh(
  new THREE.IcosahedronGeometry(7, 1),
  new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
  })
),
glows = [];

star.castShadow = false;
scene.add(star);

for (let i = 1, scaleX = 1.1, scaleY = 1.1, scaleZ = 1.1; i < 5; i++) {
let starGlow = new THREE.Mesh(
  new THREE.IcosahedronGeometry(7, 1),
  new THREE.MeshBasicMaterial({
    color: starColor,
    transparent: true,
    opacity: 0.5
  })
);
starGlow.castShadow = false;
scaleX += 0.4 + Math.random() * .5;
scaleY += 0.4 + Math.random() * .5;
scaleZ += 0.4 + Math.random() * .5;
starGlow.scale.set(scaleX, scaleY, scaleZ);
starGlow.origScale = {
  x: scaleX,
  y: scaleY,
  z: scaleZ
};
glows.push(starGlow);
scene.add(starGlow);
}

let planetColors = [
  0x333333, //grey
  0x993333, //ruddy
  0xAA8239, //tan
  0x2D4671, //blue
  0x599532, //green
  0x267257 //bluegreen
],
planets = [];

for (let p = 0, radii = 0; p < 5; p++) {
let size = 4 + Math.random() * 7,
  type = Math.floor(Math.random() * planetColors.length),
  roughness = Math.random() > .6 ? 1 : 0,
  planetGeom = new THREE.Mesh(
    new THREE.IcosahedronGeometry(size, roughness),
    new THREE.MeshLambertMaterial({
      color: planetColors[type],
      flatShading: THREE.FlatShading
    })
  ),
  planet = new THREE.Object3D();

planet.add(planetGeom);

if (type > 1 && Math.random() > 0.5) {
  let atmoGeom = new THREE.Mesh(
    new THREE.IcosahedronGeometry(size + 1.5, roughness),
    new THREE.MeshLambertMaterial({
      color: planetColors[3],
      flatShading: THREE.FlatShading,
      transparent: true,
      opacity: 0.5
    })
  );

  atmoGeom.castShadow = false;
  planet.add(atmoGeom);
}

planet.orbitRadius = Math.random() * 50 + 50 + radii;
planet.rotSpeed = 0.005 + Math.random() * 0.01;
planet.rotSpeed *= Math.random() < .10 ? -1 : 1;
planet.rot = Math.random();
planet.orbitSpeed = (0.02 - p * 0.0048) * 0.25;
planet.orbit = Math.random() * Math.PI * 2;
planet.position.set(planet.orbitRadius, 0, 0);

radii = planet.orbitRadius + size;
planets.push(planet);
scene.add(planet);

let orbit = new THREE.Line(
  new THREE.CircleGeometry(planet.orbitRadius, 90),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: .05,
    side: THREE.BackSide
  })
);
orbit.geometry.vertices.shift();
orbit.rotation.x = THREE.Math.degToRad(90);
scene.add(orbit);
}

//Lights
let light1 = new THREE.PointLight(starColor, 2, 0, 0);

light1.position.set(0, 0, 0);
scene.add(light1);

let light2 = new THREE.AmbientLight(0x090909);
scene.add(light2);

//2D
let bgStars = [];

for (let i = 0; i < 500; i++) {
let tw = {
  x: Math.random(),
  y: Math.random()
}

bgStars.push(tw);

//Main Loop
let t = 0;

for (let s in bgStars) {
  let q = bgStars[s],
    oX = q.x * this.state.windowWidth,
    oY = q.y * this.state.windowHeight,
    size = Math.random() < .9998 ? Math.random() : Math.random() * 3;
}

for (let p in planets) {
  let planet = planets[p];
  planet.rot += planet.rotSpeed
  planet.rotation.set(0, planet.rot, 0);
  planet.orbit += planet.orbitSpeed;
  planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
}
t += 0.01;
star.rotation.set(0, t, 0);
for (let g in glows) {
  let glow = glows[g];
  glow.scale.set(
    Math.max(glow.origScale.x - .2, Math.min(glow.origScale.x + .2, glow.scale.x + (Math.random() > .5 ? 0.005 : -0.005))),
    Math.max(glow.origScale.y - .2, Math.min(glow.origScale.y + .2, glow.scale.y + (Math.random() > .5 ? 0.005 : -0.005))),
    Math.max(glow.origScale.z - .2, Math.min(glow.origScale.z + .2, glow.scale.z + (Math.random() > .5 ? 0.005 : -0.005)))
  );
  glow.rotation.set(0, t, 0);
}

    camera.position.set(1, 1, 1);
    const render = () => {
      requestAnimationFrame(render);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  }};


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
      <GLView style={{ width: "100%", height: "100%", backgroundColor: "black" }} onContextCreate={this._onGLContextCreate} />
      </View>
    )
  }
}
