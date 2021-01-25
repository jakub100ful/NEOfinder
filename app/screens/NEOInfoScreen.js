import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { Dimensions, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { Component } from "react";
import OrbitView from '../components/OrbitView';
import CustomButton from "../components/CustomButton";
import fetchNEOFavourites from "../functions/fetchNEOFavourites";
import NEORenderPreview from "../components/NEORenderPreview";

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

export default function NEOInfoScreen (props){
  const [NEO, setNEO] = useState(null)

  useEffect(()=>{
    const fetchData = async () => {
      const arrayToFetch = [props.route.params.NEOid];
      const data = await fetchNEOFavourites(arrayToFetch);
      return data;
    }

    if (props.route.params.NEO){
      setNEO(props.route.params.NEO);
    }else{
      setNEO(fetchData());
    }
  }, [])

  if (NEO == null){
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }else{

    return(

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
        <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
        <View style= {{flex: 1, marginTop: "7%", flexDirection: "row"}}>
          <CustomButton title="Back" callback={()=>{props.navigation.goBack()}}/>
          <CustomButton title="Back" callback={()=>{props.navigation.navigate('Search')}}/>

          
        </View>
        <View style={styles.NEOinfoView}>
          <Text style={styles.header}>{NEO.name}</Text>

            <View style={styles.sectionView}>
              <NEORenderPreview />
            </View>

            <View style={styles.sectionView}>
              <Text style={styles.sectionHeader}>General Info</Text>
              <View style={styles.sectionBody}>

                <Text style={styles.mainText}>Hazardous: {NEO["is_potentially_hazardous_asteroid"] ? "Yes" : "No"}</Text>
                <Text style={styles.mainText}>Orbiting Body: {NEO.close_approach_data[0].orbiting_body}</Text>
                
              </View>
            </View>
            <View style={styles.sectionView}>
              <Text style={styles.sectionHeader}>Close Approach Data</Text>
              <Text style={styles.mainText}>Close Approach Date: {NEO.close_approach_data[0].close_approach_date}</Text>
              <Text style={styles.mainText}>Miss Distance: {Math.round(NEO.close_approach_data[0].miss_distance.kilometers*100)/100} km</Text>
              <Text style={styles.mainText}>Relative Velocity: {Math.round(NEO.close_approach_data[0].relative_velocity.kilometers_per_second*100)/100} km/s</Text>
            </View>
          
        </View>
        {/* <OrbitView width={windowWidth} height={windowHeight}/> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
      position: "absolute",
      height: "100%",
      width: "100%",
      resizeMode: "stretch"
  },
  NEOinfoView: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flex: 7,
    width: "90%",
    paddingVertical: 10,
    alignItems: "center"
  },
  sectionView: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flex: 1,
    width: "90%",
    marginBottom: 5
  },
  header: {
    fontWeight: '500',
    fontSize: 40,
    fontFamily: "8-bit-Arcade-In",
    color: "white"
},
  sectionHeader: {
    fontWeight: '500',
    fontSize: 35,
    fontFamily: "8-bit-Arcade-In",
    color: "white",
    backgroundColor: "#1d1135",
    padding: 5
},
  mainText: {
    fontSize: 27,
    fontFamily: "8-bit-Arcade-In",
    color: "white"
  },
  
})