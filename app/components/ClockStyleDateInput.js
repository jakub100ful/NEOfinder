import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react/cjs/react.development';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


export default function ClockStyleDateInput(props) {
    let [fontsLoaded] = useFonts({
        '3Dventure': require('../../assets/fonts/3Dventure.ttf'),
    });
    let [dateList, setDateList] = useState(null);
    let [customStyle, setCustomStyle] = useState(props.style);

    useEffect(() => {
        if (props.value != null){
            let stringDate = props.value;
            stringDate = stringDate.toString();
            setDateList([...stringDate])
        }
    }, [props.value])
    
    if (!fontsLoaded) {
        return(
            <View>
                <Text>Font could not be loaded.</Text>
            </View>
        );
    }else{
    return (
        <View style={[styles.mainView, customStyle]}>
            {/* <TextInput
            style={styles.textInput}
            value={date}
            onFocus={props.onFocus}
            /> */}
                <FlatList
                    
                    horizontal={true}
                    contentContainerStyle={styles.listView}
                    data={dateList}
                    keyExtractor={(item, index) => 'key'+index}
                    renderItem={({item}) => 
                    {
                        if(item == "-"){
                            return (
                                <Text style={{backgroundColor: "black", 
                                width: 5,}}></Text> 
                            )
                        }else{
                            return (
                                <TouchableOpacity onPress={()=>{props.onFocus()}}>
                                    <Text style={styles.itemText}>{item}</Text> 
                                </TouchableOpacity>
                            )
                        }
                    }
                }

                />
        </View>
    )
    }
}

const styles = StyleSheet.create({
    textInput: { 
        flex: 1,
        fontFamily: "3Dventure",
        fontSize: 50,
        color: "black",
        backgroundColor: "white"
    },
    listView: {
        flex:1, 
        justifyContent: "center"
    },
    mainView: {
        flex: 1,
        flexDirection: "row",
    },
    itemText: {
        fontSize:50, 
        color: "lime", 
        backgroundColor: "purple", 
        marginRight: 5, 
        width: 35,
        fontFamily: "3Dventure",
        textAlign: "center"
    }
})
