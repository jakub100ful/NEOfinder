import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { Dimensions, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { Component } from "react";
import OrbitView from '../components/OrbitView';
import CustomButton from "../components/CustomButton";

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

export default class RenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NEO: this.props.route.params.NEO,
      orbitData: null,
      error: null,
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height
    };
  }


  // componentDidMount(){
  //   if(this.state.orbitData == null){
  //     fetch(`https://ssd-api.jpl.nasa.gov/sbdb.api?spk=${this.state.spk}&cd-epoch=1`)
  //           .then((response) => response.json())
  //           .then((responseJson) => {
  //           // Unloading payload depending on a successful call.

  //               if (responseJson.orbit){
  //                   const orbitDataResponse = responseJson.orbit;
  //                   this.setState({orbitData: orbitDataResponse});
  //               }else{
  //                   this.setState({error: "Unable to fetch orbit data at this moment. Please try later or restart the app."});
  //               }
  //           // Error Handling
  //           }).catch((er) => {
  //               this.setState({error: er});
  //           })
    
  //           if(this.state.error){
  //               console.log(this.state.error);
  //           }
  //   }
  // }


  render() {
    return(

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
        <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
        <View style= {{flex: 1, marginTop: "7%", flexDirection: "row"}}>
          <CustomButton title="Back" callback={()=>{this.props.navigation.goBack()}}/>
          <CustomButton title="Back" callback={()=>{this.props.navigation.navigate('Search')}}/>

          
        </View>
        <View style={styles.NEOinfoView}>
          <Text style={styles.header}>{this.state.NEO.name}</Text>
            <View style={styles.sectionView}>
              <Text style={styles.sectionHeader}>General Info</Text>
              <View style={styles.sectionBody}>

              </View>
              <Text style={styles.mainText}>Hazardous: {this.state.NEO["is_potentially_hazardous_asteroid"] ? "Yes" : "No"}</Text>
              <Text style={styles.mainText}>Orbiting Body: {this.state.NEO.close_approach_data[0].orbiting_body}</Text>
              
            </View>
            <View style={styles.sectionView}>
              <Text style={styles.sectionHeader}>Close Approach Data</Text>
              <Text style={styles.mainText}>Close Approach Date: {this.state.NEO.close_approach_data[0].close_approach_date}</Text>
              <Text style={styles.mainText}>Miss Distance: {Math.round(this.state.NEO.close_approach_data[0].miss_distance.kilometers*100)/100} km</Text>
              <Text style={styles.mainText}>Relative Velocity: {Math.round(this.state.NEO.close_approach_data[0].relative_velocity.kilometers_per_second*100)/100} km/s</Text>
            </View>
          
        </View>
        {/* <OrbitView width={this.state.windowWidth} height={this.state.windowHeight}/> */}
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