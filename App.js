import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IntroScreen from './app/screens/IntroScreen';
import MainTabNavigator from './app/screens/MainTabNavigator';


export default function App() {
  return (
    <IntroScreen />
    // <MainTabNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
