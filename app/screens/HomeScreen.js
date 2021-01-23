import React from 'react'
import { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import CustomButton from '../components/CustomButton';
import FavouritesModal from '../components/FavouritesModal';
import ClockStyleDateInput from '../components/ClockStyleDateInput';

function HomeScreen(props) {
    
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);

    // Sets Datepicker to Visible
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Sets Datepicker to Invisible
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    /**
     * Confirms the date selection from a datepicker by saving it to the state
     * @param {date} selectedDate - Selected date 
     */
    const handleConfirm = (selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(moment(currentDate).format("YYYY-MM-DD"));
        hideDatePicker();
    };

    /**
     * Takes in date and navigates to the results page to query that date
     * @param {date} date - A date for the NEO search
     */
    const formSubmit = (date) => {
        props.navigation.navigate('Results', {date: date});
    }

    // Toggles visibility of modal
    const toggleModalVisibility = () => {
        const newState = !modalVisibility;
        setModalVisibility(newState);
    }
    
    return (
        <View style={styles.container}>
            {/* Background covers entire screen */}
            <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
            
            {/* Workable area */}
            <SafeAreaView style={styles.safeContainer}>

                {/* Title Container - contains screen title */}
                <View style={styles.topContainer}>
                    <Text style={styles.titleText}>NEO Finder</Text>
                </View>

                 {/* Body of the screen */}
                <View style={styles.mainContainer}>
                    <View style={styles.formContainer}>

                            {/* Datepicker */}
                            <Text style={styles.datepickerTitle}>Enter Date</Text>
                            <View style={styles.datepickerView}>
                                <ClockStyleDateInput 
                                    value={date}
                                    onFocus={showDatePicker}
                                />

                            </View>

                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />

                            </View>

                    <View style={styles.submitButton}>
                        <CustomButton style={{flex: 0.5}} title="FIND NEOs" callback={() => formSubmit(date)}/>
                    </View>

                    <View style={styles.neoList}>
                        {modalVisibility && <FavouritesModal callback={() => toggleModalVisibility()} />}
                        <View style={styles.modalButton}>
                            <CustomButton title="VIEW FAVOURITES" callback={() => toggleModalVisibility()}/>
                        </View>
                    </View>
                    
                </View>
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333945",
        alignItems: 'stretch'  
    },
    safeContainer: {
        flex: 1,
        
    },
    topContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainContainer: {
        flex: 8,
        alignContent: "center",
        justifyContent: "center",
        alignItems: 'stretch'
    },
    titleText: {
        flex: 1,
        color: "#3498DB",
        fontWeight: "500",
        fontSize: 70,
        fontFamily: "8-bit-Arcade-In"
    },
    formContainer: {
        flex: 1,
        alignItems: 'stretch',
        width: "90%",
        margin: "5%"
    },
    datepickerView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "blue"
    },
    datepickerTitle: {
        fontSize: 50,
        color: "white",
        fontWeight: '500',
        fontFamily: "8-bit-Arcade-In",
    },
    submitButton: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "row"
    },
    neoList: {
        flex: 7,
        backgroundColor: "darkgrey",
        justifyContent: "center"
    },
    background: {
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "stretch"
    },
    modalButton: {
        flex: 1,
    }
})