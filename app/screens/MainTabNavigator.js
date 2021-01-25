import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ResultScreen from './ResultScreen';
import IntroScreen from './IntroScreen';
import NEOInfoScreen from './NEOInfoScreen';

{/* Manages the navigation */}
function MainTabNavigator(props) {

    const SearchStack = createStackNavigator();

    return (
        <NavigationContainer>
            <SearchStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Intro"
            >
                <SearchStack.Screen name="Intro" component={IntroScreen}/>
                <SearchStack.Screen name="Search" component={HomeScreen}/>
                <SearchStack.Screen name="Results" component={ResultScreen}/>
                <SearchStack.Screen name="Info" component={NEOInfoScreen}/>
            </SearchStack.Navigator>
        </NavigationContainer>
    );
}

export default MainTabNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})