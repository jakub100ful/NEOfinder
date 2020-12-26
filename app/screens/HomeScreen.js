import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import getNEOList from '../api/api';


function HomeScreen() {
    const apiKey = "R3aOcYecyMfmnmoOL17jBY0ohDkk5o3e73j4O8BX";

    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [neoList, setNeoList] = useState(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(moment(currentDate).format("YYYY-MM-DD"));
        hideDatePicker();
    };

    function getNEOList(date){
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${apiKey}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setNeoList(responseJson.near_earth_objects);
        })
    }

    const formSubmit = (date) => {
        getNEOList(date);
        console.log(neoList);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.topContainer}>
                    <Text style={styles.titleText}>NEO Finder</Text>
                </View>

                 {/* Body of the screen */}
                <View style={styles.mainContainer}>
                    <View style={styles.formContainer}>
                        <View>
                            {/* Datepicker */}
                            <Text style={styles.datepickerTitle}>Enter Date</Text>
                            <View style={styles.datepickerView}>
                                <TextInput
                                style={styles.textInput}
                                //onChangeText={text => onChangeText(text)}
                                value={date}
                                onFocus={showDatePicker}
                                />
                                <TouchableHighlight onPress={showDatePicker}>
                                    <Ionicons name="calendar-sharp" size={24} color="black" />                                
                                </TouchableHighlight>
                            </View>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </View>
                            
                    </View>
                    <TouchableHighlight style={styles.submitButton} onPress={() => formSubmit(date)}>
                        <Text style={styles.submitButtonText}>Find NEOs</Text>
                    </TouchableHighlight>
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
        backgroundColor: "#333945",
        alignContent: "center",
        justifyContent: "center",
    },
    mainContainer: {
        flex: 8,
        backgroundColor: "#A4B0BD",
        alignContent: "center",
        justifyContent: "center",
        alignItems: 'center'
    },
    titleText: {
        flex: 1,
        color: "#3498DB",
        fontWeight: "500",
        fontSize: 30
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
    },
    textInput: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        flex: 6,
        backgroundColor: "white"
    },
    datepickerTitle: {
        fontSize: 25,
        fontWeight: '500'
    },
    submitButton: {
        backgroundColor: "#3498DB",
        padding: "5%",
        borderRadius: 25,
    },
    submitButtonText: {
        fontWeight: '500',
        fontSize: 20
    }
})