import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import handleNEOInFavouriteState from '../functions/handleNEOInFavouriteState';
import {UserContext} from '../provider/UserProvider';


function FavouriteItem(props) {
    const [item, setItem] = useState(props.item);
    const [favList, setFavList] = useState(props.favList);
    const user = useContext(UserContext);

    return (
        <View key={item.id} style={styles.item}>
            {/* Item Body */}
            <View style={styles.itemNameContainer}>
                {/* NEO Name */}
                <Text style={styles.itemNameText}>
                    Name
                </Text>
            </View>

            {/* Buttons */}
            <View style={styles.itemButtonContainer}>
                    <CustomButton style={styles.viewButton} title="VIEW" callback={() => {props.function(item)}}/>
                    <CustomButton style={styles.addButton} title={item.isInFavourites ? "REMOVE" : "ADD"} callback={() => {user.handleNEOFavouritesListChange(item)}}/>
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
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
    },
    itemHeader: {
        fontWeight: '500',
        fontSize: 35,
        fontFamily: "8-bit-Arcade-In",
        color: "white"
    },
    itemNameText: {
        marginTop: 5,
        color: "white",
        fontFamily: "8-bit-Arcade-In",
        fontSize: 35
    },
    itemNameContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    itemButtonContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    }
    
})

export default FavouriteItem;