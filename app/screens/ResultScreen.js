import React, {useContext} from 'react'
import { FlatList, View, Text, StyleSheet, Image, SafeAreaView, Button } from 'react-native'
import { useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import ItemSeparator from '../components/ItemSeparator';
import Item from '../components/Item';
import fetchNEOList from '../functions/fetchNEOList';
import { UserContext } from '../provider/UserProvider';

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
    const [date, setDate] = useState(props.route.params.date);
    const [error, setError] = useState(null);
    const [neoList, setNeoList] = useState(null);
    const user = useContext(UserContext);
    


    useEffect(() => {
        if(!AsyncStorage.getItem('userAddedNEOList')){
            AsyncStorage.setItem('userAddedNEOList', []);
        }

        // API Fetch Call
        if(neoList == null){
            const fetchData = async () => {
                const result = await fetchNEOList(date,user).then((list)=>{return list});
                setNeoList(result);
              };

            fetchData();
        }
    }, [])   


    /**
     * Takes an id of a Near Earth Object and navigates to the Orbit screen to preview the NEO's orbit
     * @param {object} NEO - NEO object to be previewed. This is passed to the new screen through the navigation prop.
     */
    const viewOrbitNEO = (NEO) => {
        console.log(NEO);
        props.navigation.navigate('Info', {NEO: NEO});
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
                renderItem={({item})=><Item item={item} function={viewOrbitNEO}/>}
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