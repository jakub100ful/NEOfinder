import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';


function IntroScreen(props) {

    /**
     * Navigates to home screen
     */
    function onStartButtonPress() {
        props.navigation.navigate('Search');
    }

    return (
        <View style={styles.mainContainer}>

            {/* Background */}
            <Image style={styles.background} source={require('../../assets/star-bg.png')}/>

            {/* Logo */}
            <View style={styles.logoView}>
                <Image style={styles.stretch} source={require('../../assets/neo-finder-logo.png')}/>
            </View>

            {/* Start button */}
            <View style={styles.buttonView}>
                <View style={{width: "60%", height: "100%"}}>
                    <CustomButton title="Start" callback={()=>{onStartButtonPress()}}/>
                </View>
            </View>
        </View>
    );
    

    
}

const styles = new StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "stretch",
    },
    logoView: {
        flex: 2,
        alignItems: 'stretch',
        alignContent: "center",
        width: "100%",
    },
    buttonView: {
        flex: 1,
        alignItems: 'center',
    },
    stretch: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    background: {
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "stretch"
    }
})

export default IntroScreen;