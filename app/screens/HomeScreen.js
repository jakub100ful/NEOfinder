import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import CustomButton from '../components/CustomButton';


function HomeScreen(props) {
    
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

    const formSubmit = (date) => {
        props.navigation.navigate('Results', {date: date});
    }

    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../../assets/star-bg.png')}/>
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
                    <View style={styles.submitButton}>
                        <CustomButton title="FIND NEOs" callback={() => formSubmit(date)}/>
                    </View>
                    <View style={styles.neoList}>
                        
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
    },
    textInput: { 
        height: 40, 
        flex: 6,
        fontFamily: "8-bit-Arcade-In",
        fontSize: 30,
        color: "white"
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
    },
    submitButtonText: {
        fontWeight: '500',
        fontSize: 20
    },
    neoList: {
        flex: 6,
        backgroundColor: "darkgrey"
    },
    background: {
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "stretch"
    }
})