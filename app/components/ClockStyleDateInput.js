import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react/cjs/react.development';
import { FlatList } from 'react-native-gesture-handler';


export default function ClockStyleDateInput(props) {
    let [fontsLoaded] = useFonts({
        '3Dventure': require('../../assets/fonts/3Dventure.ttf'),
    });
    let [date, setDate] = useState(null);
    let [dateList, setDateList] = useState(null);

    useEffect(() => {
        if (props.value != null){
            setDate(props.value)
            let stringDate = props.value.toString();
            setDateList([...stringDate])
            console.log(dateList)
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
        <View style={styles.mainView}>
            <TextInput
            style={styles.textInput}
            value={date}
            onFocus={props.onFocus}
            />
            {/* <FlatList
                horizontal={true}
                style={{flex:1, marginRight: 10}}
                data={dateList}
                renderItem={(data) => <Text>{data}</Text> }
            /> */}
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
    mainView: {
        flex: 1,
    }
})
