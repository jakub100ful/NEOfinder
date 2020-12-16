import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SavedScreen from './SavedScreen';

function MainTabNavigator(props) {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="HomeScreen" component={HomeScreen}/>
                <Tab.Screen name="SavedScreen" component={SavedScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainTabNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})