import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainTabNavigator from './MainTabNavigator';
import { useFonts } from 'expo-font';

// const starTile = require('../../assets/bg-star-tile.png');

// let RepeatImage = React.createClass({
//     render: function(){
//     let images = [],  
//     imgWidth = 7,
//     winWidth =Dimensions.get('window').width;

//     for(let i=0;i<Math.ceil(winWidth / imgWidth);i++){
//         images.push((
//            <Image source={starTile}/>
//         ))
//     }

//     return (
//         <View style={{flex:1,flexDirection:'row'}}>
//         {
//          images.map(function(img,i){
//          return img;
//          })
//         }
//         </View>
//     )
//   }
// });

function IntroScreen(props) {
    let [fontsLoaded] = useFonts({
        '8-bit-Arcade-In': require('../../assets/fonts/8-bit-Arcade-In.ttf'),
    })

    if (!fontsLoaded) {
        return(
            <View>
                <Text>Font could not be loaded.</Text>
            </View>
        )
    }else{
        return (
            <View style={styles.mainContainer}>
                <View style={styles.logoView}>
                    <Image style={styles.stretch} source={require('../../assets/neo-finder-logo.png')}/>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Search')}}>
                        <ImageBackground style={styles.startButton} source={require('../../assets/blank-button.png')}>
                            <Text style={styles.startButtonText}>START</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }

    
}

const styles = new StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center"
    },
    logoView: {
        flex: 1,
        alignItems: 'stretch',
        alignContent: "center",
        width: "100%",
    },
    buttonView: {
        flex: 1,
        alignContent: "center",
        width: "60%",
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
    }
})

export default IntroScreen;