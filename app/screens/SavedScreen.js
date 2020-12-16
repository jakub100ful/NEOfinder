import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    }
})