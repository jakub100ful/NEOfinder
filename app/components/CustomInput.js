import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useState } from 'react/cjs/react.development';

function CustomInput(props) {
    let [fontsLoaded] = useFonts({
        '8-bit-Arcade-In': require('../../assets/fonts/8-bit-Arcade-In.ttf'),
    });

    let [date, setDate] = useState(props.value);

    const showDatePicker = () => {props.showDatePicker}

    if (!fontsLoaded) {
        return(
            <View>
                <Text>Font could not be loaded.</Text>
            </View>
        );
    }else{
        return (
            <View style={styles.mainView}>
                <TouchableOpacity onPress={props.callback}>
                    <View style={styles.body}>
                            <Text style={styles.dateText}>{date}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        );
    }
}

const styles = new StyleSheet.create({
    verticalBorder: {
        backgroundColor: "#4c337d",
        width: 5,
    },
    body: {
        backgroundColor: "#1d1135",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    horizontalBorder: {
        backgroundColor: "#4c337d",
        height: 5,
    },
    dateText: {
        fontFamily: "8-bit-Arcade-In",
        color: "#ffefad",
        fontSize: 55,
    },
    mainView: {
        width: "60%",
        height: "100%",
    },
    horizontalSection: {
        flexDirection: "row"
    }
})

export default CustomInput;