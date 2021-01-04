import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';

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



    return (
        <View style={styles.mainContainer}>
            <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
                <View style={styles.logoView}>
                    
                    <Image style={styles.stretch} source={require('../../assets/neo-finder-logo.png')}/>
                </View>
                <View style={styles.buttonView}>
                    <CustomButton title="Start" callback={()=>{props.navigation.navigate('Search')}}/>
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