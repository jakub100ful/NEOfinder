import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useState } from 'react/cjs/react.development';

/**
 * Custom button
 * @prop {string} title - Title of the button
 * @prop {object} style - Style to overwrite the outer container
 * @prop {number} numberOfLines - Number of lines to split the text
 * @prop {number/string} height - Height of button, must be a number or string containing correct size format
 * @prop {function} callback - Callback function for pressing the button
 */
function CustomButton(props) {
    let [fontsLoaded] = useFonts({
        '8-bit-Arcade-In': require('../../assets/fonts/8-bit-Arcade-In.ttf'),
    });
    let [fontSize, setFontSize] = useState(55);
    let [height, setHeight] = useState("55%");
    let [customStyle, setCustomStyle] = useState(props.style);
    let [numberOfLines, setNumberOfLines] = useState(1);

    // Overwriting defaults with props
    if (props.numberOfLines){
        setNumberOfLines(props.numberOfLines);
    }
    if (props.height){
        setHeight(props.height);
    }

    // If fonts not loaded display loading message
    if (!fontsLoaded) {
        return(
            <View>
                <Text>Font could not be loaded.</Text>
            </View>
        );
    }else{
        return (
            // Outer view
            <View style={[styles.mainView, customStyle]}>

                {/* Touchable wrapper */}
                <TouchableOpacity onPress={props.callback}>

                    {/* Button highlight styling */}
                    <View style={styles.buttonHighlight}/>

                    {/* Button body */}
                    <View style={[styles.buttonBody, {height: height}]}>

                        {/* Button Title */}
                        <Text 
                        numberOfLines={ numberOfLines }
                        adjustsFontSizeToFit
                        style={[styles.buttonText, {fontSize: fontSize}]}
                        onTextLayout={ (e) => {
                            const { lines } = e.nativeEvent;
                            if (lines.length > numberOfLines) {
                              setFontSize(fontSize - 1);
                            }
                          } }>
                            {props.title}
                        </Text>

                    </View>

                    {/* Button shadow styling */}
                    <View style={styles.buttonShadow}/>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = new StyleSheet.create({
    buttonHighlight: {
        backgroundColor: "#4c337d",
        height: 10,
        borderTopWidth: 1
    },
    buttonBody: {
        backgroundColor: "#1d1135",
        height: "55%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonShadow: {
        backgroundColor: "#120231",
        height: 10,
        borderBottomWidth: 1
    },
    buttonText: {
        fontFamily: "8-bit-Arcade-In",
        color: "#ba1e68",
        fontSize: 55,
    },
    mainView: {
        flex:1,
    }
})

export default CustomButton;