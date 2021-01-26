import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import {UserContext} from '../provider/UserProvider';

/**
 * Renders the item in favourite NEO list
 * @prop {string} item - NEO ID for the item
 */
function FavouriteItem(props) {
    const user = useContext(UserContext);

    // Conditional rendering to ensure the prop has loaded
    if (props.item == null){
        return(
        <View>
            <Text>Loading...</Text>
        </View>
        )
    }else{
        return (
            <View key={props.item.id} style={styles.item}>

                {/* Item Body */}
                <View style={styles.itemNameContainer}>
                    <TouchableHighlight onPress={() => {props.function(props.item)}}>
                        
                        {/* NEO Name */}
                        <Text style={styles.itemNameText}>
                            {props.item}
                        </Text>
                        
                    </TouchableHighlight>
                </View>

                {/* Button */}
                <View style={styles.itemButtonWrapper}>
                    <View style={styles.itemAddButtonContainer}>
                        <CustomButton style={styles.addButton} title="REMOVE" callback={() => {user.handleNEOFavouritesListChange(props.item)}}/>
                    </View>
                </View>
                
            </View>
    )};
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
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        padding: 10
    },
    itemHeader: {
        fontWeight: '500',
        fontSize: 35,
        fontFamily: "8-bit-Arcade-In",
        color: "white"
    },
    itemNameText: {
        color: "lightblue",
        fontFamily: "8-bit-Arcade-In",
        fontSize: 40,
    },
    itemNameContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    itemButtonWrapper: {
        flexDirection: "row",
        flex: 3,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    itemAddButtonContainer: {
        width: "60%",
        height: "100%"
    },
    itemViewButtonContainer: {
        width: "45%",
        height: "80%"
    }
    
})

export default FavouriteItem;