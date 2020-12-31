import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainTabNavigator from './MainTabNavigator';

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
            <View style={styles.logoView}>
                <Image style={styles.stretch} source={require('../../assets/neo-finder-logo.png')}/>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={()=>{return <MainTabNavigator/>}}>
                    <Image style={styles.startButton} source={require('../../assets/start-button.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = new StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "black"
    },
    logoView: {
        flex: 2,
        justifyContent: "center"
    },
    buttonView: {
        flex: 1,
        alignItems: 'center'
    },
    stretch: {
        width: "100%",
        height: "80%",
        resizeMode: "stretch"
    }
})

export default IntroScreen;