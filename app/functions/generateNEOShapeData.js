// Array of colours
const asteroidColours = [
  0x999999, // pale grey
  0x777777, // light grey
  0x555555, // grey 
  0x333333, // space grey
  0x111111 //dark grey
]


/**
 * Generates asteroid size from NEO object
 * @param {object} NEO - NEO object containing the diameter data
 * @return {float} - Size for the asteroid
 */
const getSize = (NEO) => {
  let minDiameter = NEO.estimated_diameter.meters.estimated_diameter_min,
  maxDiameter = NEO.estimated_diameter.meters.estimated_diameter_max

  const midDiameter = (maxDiameter+minDiameter)/2

  const scaledDiameter = Math.floor(midDiameter/100)

  return scaledDiameter;
}


/**
 * Generates asteroid velocity from NEO object
 * @param {object} NEO - NEO object containing the velocity data
 * @return {float} - Velocity for the asteroid
 */
const getVelocity = (NEO) => {
  let velocity = NEO.close_approach_data[0].relative_velocity.kilometers_per_second
  let scaledVelocity = velocity/10000
  return scaledVelocity;
}


/**
 * Generates asteroid orbit radius from NEO object
 * @param {object} NEO - NEO object containing the miss distance data
 * @return {float} - Orbit radius for the asteroid
 */
const getOrbitRadius = (NEO) => {
  let missDistance = NEO.close_approach_data[0].miss_distance.kilometers
  let orbitRadius = missDistance/1000000
  return orbitRadius;
}


/**
 * Gets asteroid inclination angle from NEO object
 * @param {object} NEO - NEO object containing the inclination data
 * @return {float} - Inclination angle for the asteroid
 */
const getInclination = (NEO) => {
  let inclination = Math.floor(NEO.orbital_data.inclination)
  return inclination;
}


/**
 * Generates a colour
 * @return {hex} - Colour hex value 
 */
const getColour = () => {
  let colourType = Math.floor(Math.random() * asteroidColours.length);
  return asteroidColours[colourType];
}


export { getSize, getVelocity, getOrbitRadius, getInclination, getColour };