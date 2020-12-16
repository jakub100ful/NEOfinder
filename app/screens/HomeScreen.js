import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import Card from './Card';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.topContainer}>
                    <Text style={styles.titleText}>NEO Finder</Text>
                </View>
                <View style={styles.mainContainer}>
                    <Card headerText="Welcome!"/>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333945"
    },
    safeContainer: {
        flex: 1
    },
    topContainer: {
        flex: 1,
        backgroundColor: "#333945",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    mainContainer: {
        flex: 8,
        backgroundColor: "#A4B0BD",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        flex: 1,
        color: "#3498DB",
        fontWeight: "500",
        fontSize: 30
    }
})