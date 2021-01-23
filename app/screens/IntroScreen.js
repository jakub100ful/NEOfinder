import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { Audio } from 'expo-av';


function IntroScreen(props) {
    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('../../assets/sounds/button-click-sound.wav')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync(); }
    
      React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);

    function onStartButtonPress() {
        playSound();
        props.navigation.navigate('Search');
    }

    return (
        <View style={styles.mainContainer}>
            <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
                <View style={styles.logoView}>
                    
                    <Image style={styles.stretch} source={require('../../assets/neo-finder-logo.png')}/>
                </View>
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
    startButton: {
        resizeMode: "contain",
        height: "100%",
        width: "100%",
    },
    startButtonText: {
        fontFamily: "8-bit-Arcade-In",
        color: "white"
    },
    background: {
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "stretch"
    }
})

export default IntroScreen;