import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const mockData = [
    { id: '1', text: 'Asteroid Name' },
    { id: '2', text: 'Asteroid Name' },
    { id: '3', text: 'Asteroid Name!' }
  ]

const ItemSeparator = () => <View style={{
    height: 2,
    backgroundColor: "rgba(0,0,0,0.3)"
}} />

const getAllData = () =>{
    AsyncStorage.getAllKeys().then((keys) => {
      return AsyncStorage.multiGet(keys)
        .then((result) => {
          console.log(JSON.parse(addedList));
        }).catch((e) =>{
          console.log(e);
        });
    });
  }

const addNEO = (addedNEO) =>{
    try {
        AsyncStorage
        .getItem('userAddedNEOList')
        .then(addedList => {
            const tempList = addedList == null ? [] : JSON.parse(addedList)
            addedList.forEach(object, index => {
                if (object.id === addedNEO){
                    tempList.splice(index, 1);
                    return AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList))
                }else{
                    tempList.push({'id': addedNEO})
                    return AsyncStorage.setItem('userAddedNEOList', JSON.stringify(tempList))
                }
            });
            
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

    useEffect(() => {
        // API Fetch Call
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${apiKey}`)
        .then((response) => response.json())
        .then((responseJson) => {
        // Unloading payload depending on a successful call.
            if (responseJson.near_earth_objects){
                setNeoList(responseJson.near_earth_objects);
            }else{
                setError(responseJson.error.message);
            }
        // Error Handling
        }).catch((er) => {
            setError(er);
        })

        if(error){
            console.log(error);
        }else{
            console.log(neoList);
        }
    })   

    return (
        <View
        style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "darkgrey"
        }}>
            <View style={styles.errorMessageBox}>
                <Text>{error}</Text>
            </View>
            <FlatList
            data={mockData}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.itemHeader}>
                    {item.text}
                    </Text>

                    {/* Item Body */}
                    <View style={styles.itemBodyView}>
                        <Text style={styles.itemBodyText}>
                        {item.id}
                        </Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => {addNEO(item.id)}}>
                            <Text style={styles.addButtonText}>Add NEO</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
                
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "lightblue",
        padding: 5
    },
    addButtonText: {
        fontWeight: '500',
        fontSize: 17
    },
    item: {
        padding: 10,
        backgroundColor: "grey"
    },
    itemHeader: {
        fontWeight: '500',
        fontSize: 20
    },
    itemBodyText: {
        marginTop: 5
    },
    itemBodyView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    errorMessageBox: {
        backgroundColor: "salmon",
        marginBottom: 10
    }
    
})

export default ResultScreen;