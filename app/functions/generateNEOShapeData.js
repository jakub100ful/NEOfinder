/**
 * Returns a THREE js shape from a NEO object
 * @param {object} NEO - NEO id to be shaped
 * @return {object} - Object containing NEO shape data
 */
export default function generateNEOShapeData (NEO) {
    const asteroidColors = [
      0x999999, // pale grey
      0x777777, // light grey
      0x555555, // grey 
      0x333333, // space grey
      0x111111 //dark grey
    ]

    console.log("NEO SHAPE DATA FUN",NEO);

    const getSize = () => {
      let minDiameter = NEO.estimated_diameter.meters.estimated_diameter_min,
      maxDiameter = NEO.estimated_diameter.meters.estimated_diameter_max

      const midDiameter = (maxDiameter+minDiameter)/2

      const scaledDiameter = Math.floor(midDiameter/100)

      return scaledDiameter;
    }

    const getVelocity = () => {
      let velocity = NEO.close_approach_data[0].relative_velocity.kilometers
      let scaledVelocity = velocity/10000000000
      return scaledVelocity;
    }

    const getOrbitRadius = () => {
      let missDistance = NEO.close_approach_data[0].miss_distance.kilometers
      let orbitRadius = missDistance/1000000
      return orbitRadius;
    }

    let inclinnation = Math.floor(NEO.orbital_data.inclination)


        let size = getSize(),
          type = Math.floor(Math.random() * asteroidColors.length),
          roughness = 0,
          geometry = new THREE.Mesh(
            new THREE.IcosahedronGeometry(size, roughness),
            new THREE.MeshLambertMaterial({
              color: asteroidColors[type],
            })
          ),
          asteroid = new THREE.Object3D();
      
        asteroid.add(geometry);
      
        if (type > 1 && Math.random() > 0.5) {
          let atmosphere = new THREE.Mesh(
            new THREE.IcosahedronGeometry(size + 1.5, roughness),
            new THREE.MeshLambertMaterial({
              color: asteroidColors[3],
              transparent: true,
              opacity: 1
            })
          );
      
          atmosphere.castShadow = false;
          asteroid.add(atmosphere);
        }
      
        asteroid.orbitRadius = getOrbitRadius();
        asteroid.rotSpeed = 0.005 + Math.random() * 0.01;
        asteroid.rotSpeed *= Math.random() < .10 ? -1 : 1;
        asteroid.rot = Math.random();
        asteroid.orbitSpeed = getVelocity();
        asteroid.orbit = Math.random() * Math.PI * 2;
        asteroid.position.set(asteroid.orbitRadius, 0, 0);
        asteroid.inclination = inclinnation;
            
        let orbit = new THREE.Line(
          new THREE.CircleGeometry(asteroid.orbitRadius, 90),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1,
            side: THREE.BackSide
          })
        );
        orbit.geometry.vertices.shift();
        orbit.rotation.x = THREE.Math.degToRad(inclinnation);
        
        const NEOShapeData = [asteroid, orbit];
        return NEOShapeData;
  }