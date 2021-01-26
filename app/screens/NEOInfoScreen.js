import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import React from "react";
import CustomButton from "../components/CustomButton";
import NEORenderPreview from "../components/NEORenderPreview";
import fetchNEOOrbitData from "../functions/fetchNEOOrbitData";


export default function NEOInfoScreen (props){
  const [NEO, setNEO] = useState(null);
  const [tempNEO, setTempNEO] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      const data = await fetchNEOOrbitData(props.route.params.NEOid);
      setTempNEO(data);
    }
    

    if (props.route.params.NEO){
      setNEO(props.route.params.NEO);
    }else{
      fetchData(); 
    }
  }, [])

  /**
   * Fetches data for given NEO object and ensures it contains approach data for the 
   * soonest or most recent period.
   */
  useEffect(()=>{
    if (tempNEO != null){
      const currentDate = new Date();
      let stateCopy = tempNEO;
      let closestApproachDate;
      
      // Runs through individual approach dates
      for (let approachDate of stateCopy.close_approach_data){
        let formattedDate = Date.parse(approachDate.close_approach_date);

        // If date is larger than current date, use it and break the loop,
        // if not save it and continue the loop.
        if (formattedDate > currentDate){
          closestApproachDate = approachDate;
          break;
        }else {
          closestApproachDate = approachDate;
        }
      }
  
      // Modify the NEO object so that it only contains the relevant approach date
      stateCopy.close_approach_data = [closestApproachDate];
      setNEO(stateCopy)
    }
  },[tempNEO])

  // Conditional rendering
  if (NEO == null){
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }else{
    return(

      // Background
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
        <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
        
        {/* Body */}
        <View style={styles.body}>
          <View style={styles.NEOinfoView}>
            
            {/* Intro view - displays name */}
            <View style={styles.introView}>
              <View style={styles.introInfoView}>
                <Text style={styles.header}>{NEO.name}</Text>
              </View>
            </View>

            {/* NEO Preview - displays preview of the NEO */}
            <View style={styles.NEOPreview}>
              <NEORenderPreview NEO={NEO}/>
            </View>

            {/* NEO Info - displays information about the close approach of the NEO */}
              <View style={styles.sectionView}>
                <Text style={styles.sectionHeader}>Close Approach Data</Text>

                {/* Section Body */}
                <View style={styles.sectionBody}>

                  {/* Text and subtext components for displaying data */}
                  <Text style={styles.mainText}>Hazardous:</Text>
                  <Text style={styles.subText}>{NEO["is_potentially_hazardous_asteroid"] ? "Yes" : "No"}</Text>
                  
                  <Text style={styles.mainText}>Orbiting Body:</Text>
                  <Text style={styles.subText}>{NEO.close_approach_data[0].orbiting_body}</Text>
                  
                  <Text style={styles.mainText}>Close Approach Date:</Text>
                  <Text style={styles.subText}>{NEO.close_approach_data[0].close_approach_date}</Text>
                  
                  <Text style={styles.mainText}>Miss Distance:</Text>
                  <Text style={styles.subText}>{Math.round(NEO.close_approach_data[0].miss_distance.kilometers*100)/100} km</Text>
                  
                  <Text style={styles.mainText}>Relative Velocity:</Text>
                  <Text style={styles.subText}>{Math.round(NEO.close_approach_data[0].relative_velocity.kilometers_per_second*100)/100} km/s</Text>
                  
                  <Text style={styles.mainText}>Estimated Diameter:</Text>
                  <Text style={styles.subText}>{Math.round(NEO.estimated_diameter.meters.estimated_diameter_min*100)/100} m</Text>                  
              </View>
            </View>
          </View>
        </View>

        {/* Back Button */}
        <View style= {{flex: 1, marginTop: "7%", flexDirection: "row"}}>
          <CustomButton title="Back" callback={()=>{props.navigation.goBack()}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 12,
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
      position: "absolute",
      height: "100%",
      width: "100%",
      resizeMode: "stretch"
  },
  NEOinfoView: {
    height: "85%"
  },
  sectionView: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 5
  },
  header: {
    fontWeight: '500',
    fontSize: 35,
    fontFamily: "8-bit-Arcade-In",
    color: "white",
    textAlign: "center"
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
    fontSize: 30,
    fontFamily: "8-bit-Arcade-In",
    color: "white"
  },
  subText: {
    fontSize: 27,
    fontFamily: "3Dventure",
    color: "white"
  },
  introView: {
    flex: 0.5,
    width: "100%",
    marginBottom: 5,
    flexDirection: "row"
  },
  introInfoView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1d1135",
  },
  NEOPreview: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  sectionBody: {
    width: "90%",
    paddingLeft: 10
  }
  
})