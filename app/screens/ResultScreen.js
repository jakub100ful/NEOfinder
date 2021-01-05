import React from 'react'
import { FlatList, View, Text, StyleSheet, Image, SafeAreaView, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import CustomButton from '../components/CustomButton';



const ItemSeparator = () => <View style={{
    height: 2,
    backgroundColor: "rgba(0,0,0,0.3)"
}} />

const getAllData = () =>{
    AsyncStorage.getAllKeys().then((keys) => {
      return AsyncStorage.multiGet(keys)
        .then((result) => {
          console.log(JSON.stringify(result));
        }).catch((e) =>{
          console.log(e);
        });
    });
  }

const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}


const addNEO = (addedNEO) =>{
    try {
        AsyncStorage
        .getItem('userAddedNEOList')
        .then(addedList => {
            const parsedList = addedList == null ? [] : JSON.parse(addedList);
            const tempList = parsedList;
            let matchNotFound = true;
            
            // List is already empty, no need to check for existing keys
            if(!parsedList){
                tempList.push({'id': addedNEO})
                return AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList))

            // List is populated, and therefore needs to be iterated through to avoid duplicate keys
            }else{
                parsedList.forEach((object, index) => {
                    // If a match is found, it removes the existing key
                    if (object.id === addedNEO){
                        matchNotFound = false;
                        tempList.splice(index, 1);
                        return AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList))
                    }
                });
                // If no match is found, it is safe to add the key to the array
                if (matchNotFound){
                    tempList.push({'id': addedNEO})
                    return AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList));
                }
            }
            
        })
    } catch (e) {
        console.log(e);
    }
    getAllData();
};



function ResultScreen(props) {
    const apiKey = "R3aOcYecyMfmnmoOL17jBY0ohDkk5o3e73j4O8BX";
    const [date, setDate] = useState(props.route.params.date);
    const [neoList, setNeoList] = useState(null);
    const [error, setError] = useState(null)
    const [isInFavourites, setIsInFavourites] = useState(false);

    useEffect(() => {
        if(!AsyncStorage.getItem('userAddedNEOList')){
            AsyncStorage.setItem('userAddedNEOList', []);
        }

       

        // API Fetch Call
        if(neoList == null){
            console.log("NEO Fetched");
            fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${apiKey}`)
            .then((response) => response.json())
            .then((responseJson) => {
            // Unloading payload depending on a successful call.
                if (responseJson.near_earth_objects){
                    const responseNEO = responseJson.near_earth_objects;
                    const tempNEOList = [];

                    for (let key in responseNEO){
                        if (date == key){
                            responseNEO[key].forEach((NEO)=>{
                                tempNEOList.push(NEO);
                            })
                        }
                        
                    }

                    setNeoList(tempNEOList);
                }else{
                    setError(responseJson.error.message);
                }
            // Error Handling
            }).catch((er) => {
                setError(er);
            })
    
            if(error){
                console.log(error);
            }
        }
    })   

    const determineButton = (NEOid) => {
        try{
            AsyncStorage
            .getItem('userAddedNEOList')
            .then(favouritesList => {
                const parsedList = favouritesList == null ? [] : JSON.parse(favouritesList);
                setIsInFavourites(false);
                if(parsedList){
                    parsedList.forEach((favourite)=>{
                        if (favourite.id === NEOid){
                            console.log("Found match");
                            setIsInFavourites(true);
                        }
                    })
                }
            })
        }catch{
            console.log(e);
        }
    }

    const viewOrbitNEO = (NEOspk) => {
        props.navigation.navigate('Orbit', {spk: NEOspk});
    }

    return (
        <View
        style={{
        flex: 1,
        }}>
            <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        {neoList ? 'Results ' : 'Loading'}
                    </Text>
                    <Button title="Clear" onPress={()=>{clearAsyncStorage()}} />
                    <Button title="Get Favourites" onPress={()=>{getAllData()}} />

                </View>
                {error && <View style={styles.errorMessageBox}>
                    <Text>{error}</Text>
                </View>
                }
                <FlatList
                style={styles.listView}
                data={neoList}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => {
                determineButton(item.id);
                (
                    <View key={item.id} style={styles.item}>
                        <Text style={styles.itemHeader}>
                            {item.name}
                        </Text>

                        {/* Item Body */}
                        <View style={styles.itemBodyView}>
                            <View>
                                <Text style={styles.itemBodyText}>
                                Orbiting Body: {item.close_approach_data[0].orbiting_body}
                                </Text>
                                <Text style={styles.itemBodyText}>
                                Close Approach Date: {item.close_approach_data[0].close_approach_date}
                                </Text>
                                <Text style={styles.itemBodyText}>
                                Miss Distance: {Math.round(item.close_approach_data[0].miss_distance.kilometers*100)/100} km
                                </Text>
                                <Text style={styles.itemBodyText}>
                                Relative Velocity: {Math.round(item.close_approach_data[0].relative_velocity.kilometers_per_second*100)/100} km/s
                                </Text>
                                
                            </View>
                            
                        </View>
                        <View style={styles.buttonView}>
                                
                                <CustomButton style={styles.viewButton} title="VIEW" callback={() => {viewOrbitNEO(item.id)}}/>
                                <CustomButton style={styles.addButton} title={isInFavourites ? "REMOVE" : "ADD"} callback={() => {addNEO(item.id)}}/>
                            </View>
                        
                    </View>
                    
                    
                )}}
                />
            </SafeAreaView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        flex: 1
    },
    viewButton: {
        flex: 1
    },
    item: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
    },
    itemHeader: {
        fontWeight: '500',
        fontSize: 35,
        fontFamily: "8-bit-Arcade-In",
        color: "white"
    },
    itemBodyText: {
        marginTop: 5,
        color: "white",
        fontFamily: "8-bit-Arcade-In",
        fontSize: 25
    },
    itemBodyView: {
        flex: 1,
    },
    errorMessageBox: {
        backgroundColor: "salmon",
        marginBottom: 10,
    },
    buttonStretch: {
        height: 50,
        resizeMode: "contain"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flex: 1,
    },
    background: {
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "stretch"
    },
    mainContainer: {
        marginVertical: "5%",
        marginHorizontal: "5%",
        flex: 1
    },
    titleText: {
        color: "white",
        fontSize: 50,
        fontFamily: "8-bit-Arcade-In"
    },
    titleView: {
        alignItems: "center",
        padding: 5
    },
    listView: {
        flex: 9,
        
    }
    
})

export default ResultScreen;