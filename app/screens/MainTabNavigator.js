import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SavedScreen from './SavedScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ResultScreen from './ResultScreen';


function MainTabNavigator(props) {
    const Tab = createBottomTabNavigator();

    const SearchStack = createStackNavigator();

    const SearchStackScreen = () => (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search" component={HomeScreen}/>
            <SearchStack.Screen name="Results" component={ResultScreen}/>
        </SearchStack.Navigator>
    )

    return (
        <NavigationContainer>
            {/* <Stack.Navigator>
                <Stack.Screen name="Results" component={ResultScreen} />
            </Stack.Navigator> */}
            <Tab.Navigator>
                <Tab.Screen name="HomeScreen" component={SearchStackScreen}/>
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