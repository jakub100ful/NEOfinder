import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import handleNEOInFavouriteState from '../functions/handleNEOInFavouriteState';
import {UserContext} from '../provider/UserProvider';


function Item(props) {
    const [item, setItem] = useState(props.item);
    const [favList, setFavList] = useState(props.favList);
    const user = useContext(UserContext);

    return (
        <View key={item.id} style={styles.item}>
            <Text style={styles.itemHeader}>
                {item.name}
            </Text>

            {/* Item Body */}
            <View style={styles.itemBodyView}>
                <View>
                    <Text style={styles.itemBodyText}>
                    Orbiting Body: {item.close_approach_data[0].orbiting_body}
                    </Text>
                    <Text style={styles.itemBodyText}>
                    Close Approach Date: {item.close_approach_data[0].close_approach_date}
                    </Text>
                    <Text style={styles.itemBodyText}>
                    Miss Distance: {Math.round(item.close_approach_data[0].miss_distance.kilometers*100)/100} km
                    </Text>
                    <Text style={styles.itemBodyText}>
                    Relative Velocity: {Math.round(item.close_approach_data[0].relative_velocity.kilometers_per_second*100)/100} km/s
                    </Text>
                    
                </View>
                
            </View>
            <View style={styles.buttonView}>
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
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
    },
    itemHeader: {
        fontWeight: '500',
        fontSize: 35,
        fontFamily: "8-bit-Arcade-In",
        color: "white"
    },
    itemBodyText: {
        marginTop: 5,
        color: "white",
        fontFamily: "8-bit-Arcade-In",
        fontSize: 25
    },
    itemBodyView: {
        flex: 1,
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flex: 1,
    }
    
})

export default Item;