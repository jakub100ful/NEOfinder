import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { Dimensions, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { Component } from "react";
import OrbitView from './OrbitView';

// https://ssd-api.jpl.nasa.gov/doc/sbdb.html

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
        <View style= {{flex: 1, marginTop: "7%", flexDirection: "row"}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
              <Image source={require('../../assets/back-button.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Search')}}>
              <Image source={require('../../assets/add-button.png')}/>
          </TouchableOpacity>
        </View>
        <OrbitView width={this.state.windowWidth} height={this.state.windowHeight}/>
      </View>
    )
  }
}
