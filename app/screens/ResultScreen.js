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

/**
     * Prints all data within AsyncStorage.
     */
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

function ResultScreen(props) {
    const apiKey = "R3aOcYecyMfmnmoOL17jBY0ohDkk5o3e73j4O8BX";
    const [date, setDate] = useState(props.route.params.date);
    const [neoList, setNeoList] = useState(null);
    const [error, setError] = useState(null);
    const [favList, setFavList] = useState(null);


    /**
     * Takes an id of a Near Earth Object and adds or removes it from the favourites list.
     * @param {string} NEOid - Identifier for the NEO to be added/removed
     */
    const handleNEOFavouriteState = (NEOid) =>{
        try {
            console.log("Type of fav list is: ",typeof favList);
            const parsedList = favList == null ? [] : favList;
            const tempList = parsedList;
            let matchFound = false;
            console.log("Parsed list: ",parsedList);
            
            // List is already empty, no need to check for existing keys
            if (parsedList === undefined || parsedList.length == 0) {
                console.log("List is empty. Adding the id. Parsed list: ",parsedList);
                console.log("Type of TempList: ",typeof(tempList));
                tempList.push(NEOid);
                AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList));
                setFavList(tempList);
            // List is populated, and therefore needs to be iterated through to avoid duplicate keys
            }else{
                console.log(typeof parsedList);
                for (let i = 0; i < parsedList.length; i++){
                    // If a match is found, it removes the existing key
                    console.log("NEO ID Currently in the list: ",parsedList[i], "Added NEO id:",NEOid)
                    if (parsedList[i] === NEOid){
                        console.log("Match found, removing existing key");
                        matchFound = true;
                        tempList.splice(i, 1);
                        AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList));
                        setFavList(tempList);
                        break;
                    }
                }

                // If no match is found, it is safe to add the key to the array
                if (!matchFound){
                    console.log("Match not found, key added",tempList);
                    tempList.push(NEOid);
                    AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList));
                    setFavList(tempList);
                }
            }

        } catch (e) {
            console.log(e);
        }
        console.log("Fav List (State):",favList);
        getAllData();
    };


    /**
     * Fetches the most up to date favourite list and saves it to a local state hook
     */
    const favouriteListSetter = async () => {
        AsyncStorage.getItem('userAddedNEOList')
        .then((favouritesList)=>{
            const parsedList = favouritesList == null ? [] : JSON.parse(favouritesList).map((NEO) => {return NEO});
            setFavList(parsedList);
        })
    }

    useEffect(() => {
        if(!AsyncStorage.getItem('userAddedNEOList')){
            AsyncStorage.setItem('userAddedNEOList', []);
        }

        favouriteListSetter();

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
    }, [])   


    /**
     * Takes an id of a Near Earth Object and returns a boolean based on whether it is in favourites
     * @param {string} NEOid - Identifier for the NEO to be looked up in favourites
     * @return {boolean} Boolean result
     */
    const NEOisInFavourites = (NEOid) => {
        let isInFavourites = false;
        const tempList = favList == null ? [] : favList;

        if (tempList != undefined || tempList.length != 0) {
            for (let favourite of tempList){
                if (favourite === NEOid){
                    isInFavourites = true;
                    break;
                }
            }
        }

        return isInFavourites;
    }

    /**
     * Takes an id of a Near Earth Object and navigates to the Orbit screen to preview the NEO's orbit
     * @param {string} NEOspk - Identifier for the NEO to be previewed. This is passed to the new screen through the navigation prop.
     */
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
                refreshing={true}
                renderItem={({ item }) => 
                
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
                                <CustomButton style={styles.addButton} title={NEOisInFavourites(item.id) ? "REMOVE" : "ADD"} callback={() => {handleNEOFavouriteState(item.id)}}/>
                            </View>
                        
                    </View>
                    
                    
                )}
                />
            </SafeAreaView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        flex: 1,
    },
    viewButton: {
        flex: 1,
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