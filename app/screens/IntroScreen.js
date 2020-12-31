import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

function IntroScreen(props) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoView}>
                <Image style={styles.stretch} source={require('../../assets/neo-finder-logo.png')}/>
            </View>
            <View style={styles.buttonView}>

            </View>
        </View>
    );
}

const styles = new StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "black"
    },
    logoView: {
        flex: 1
    },
    buttonView: {
    },
    stretch: {
        width: "100%",
        height: "60%",
        resizeMode: "stretch"
    }
})

export default IntroScreen;