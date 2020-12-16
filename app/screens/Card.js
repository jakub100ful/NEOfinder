import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text>{props.headerText}</Text>
            </View>
            <View style={styles.cardBody}>
                <Text>{props.bodyText}</Text>
            </View>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        maxWidth: '80%',
        flexDirection: "row"
    },
    cardHeader: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "white",
    },
    cardBody: {
        flex: 1,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: "white"
    }
})