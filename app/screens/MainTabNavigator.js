import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SavedScreen from './SavedScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ResultScreen from './ResultScreen';
import RenderScreen from './RenderScreen';
import IntroScreen from './IntroScreen';


function MainTabNavigator(props) {
    const Tab = createBottomTabNavigator();

    const SearchStack = createStackNavigator();

    const SearchStackScreen = () => (
        
        <NavigationContainer>
            <Tab.Navigator>
                {/* <Tab.Screen name="HomeScreen" component={SearchStackScreen}/> */}
                <Tab.Screen name="SavedScreen" component={SavedScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )

    return (
        <NavigationContainer>
            <SearchStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <SearchStack.Screen name="Intro" component={IntroScreen}/>
                <SearchStack.Screen name="Search" component={HomeScreen}/>
                <SearchStack.Screen name="Results" component={ResultScreen}/>
                <SearchStack.Screen name="Orbit" component={RenderScreen}/>
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