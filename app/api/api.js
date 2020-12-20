import React, { Component } from 'react';
import { useState } from 'react/cjs/react.development';

const apiKey = "R3aOcYecyMfmnmoOL17jBY0ohDkk5o3e73j4O8BX";


function getNEOList(date){
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson.near_earth_objects);
        return responseJson.near_earth_objects;
    })
}

export default getNEOList;
