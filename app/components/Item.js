import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import {UserContext} from '../provider/UserProvider';

/**
 * Renders the NEO result object
 * @prop {object} item - NEO result object
 */
function Item(props) {
    const [item, setItem] = useState(props.item);
    const user = useContext(UserContext);

    return (
        // Outer view
        <View key={item.id} style={styles.item}>

            {/* Header */}
            <Text style={styles.itemHeader}>
                {item.name}
            </Text>

            {/* Item Body */}
            <View style={styles.itemBodyView}>

                {/* NEO Information */}
                <View>
                    <Text style={styles.itemBodyText}>
                    Miss Distance: {Math.round(item.close_approach_data[0].miss_distance.kilometers*100)/100} km
                    </Text>
                    <Text style={styles.itemBodyText}>
                    Relative Velocity: {Math.round(item.close_approach_data[0].relative_velocity.kilometers_per_second*100)/100} km/s
                    </Text>
                </View>
                
            </View>

            {/* Buttons */}
            <View style={styles.buttonView}>

                {/* View Button */}
                <View style={styles.itemViewButtonContainer}>
                    <CustomButton style={styles.viewButton} title="VIEW" callback={() => {props.function(item)}}/>
                </View>

                {/* Save Button */}
                <View style={styles.itemAddButtonContainer}>
                    <CustomButton style={styles.addButton} title={item.isInFavourites ? "UNSAVE" : "SAVE"} callback={() => {user.handleNEOFavouritesListChange(item)}}/>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        flex: 1,
    },
    viewButton: {
        flex: 1,
    },
    item: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    itemHeader: {
        fontWeight: '500',
        fontSize: 35,
        fontFamily: "8-bit-Arcade-In",
        color: "white",
        padding: 10
    },
    itemBodyText: {
        marginTop: 5,
        color: "white",
        fontFamily: "8-bit-Arcade-In",
        fontSize: 25
    },
    itemBodyView: {
        flex: 1,
        width: "90%",
        alignItems: "center"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1,
        marginTop: 10
    },
    itemAddButtonContainer: {
        width: "40%",
        height: "100%"
    },
    itemViewButtonContainer: {
        width: "40%",
        height: "80%"
    }
    
})

export default Item;