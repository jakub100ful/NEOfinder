import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";


function HomeScreen() {
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(moment(currentDate).format("YYYY-MM-DD"));
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const hideDatepicker = () => {
        setShow(false);
    }

    console.log(date);

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
                            <View style={styles.datepickerView}>
                                <TextInput
                                style={styles.textInput}
                                //onChangeText={text => onChangeText(text)}
                                value={date}
                                onFocus={showDatepicker}
                                />
                                <TouchableHighlight onPress={showDatepicker}>
                                    <Ionicons name="calendar-sharp" size={24} color="black" />                                
                                </TouchableHighlight>
                            </View>
                            {show && (
                                <View>
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={moment(date).format('YYYY-MM-DDThh:mm:ssZ')}
                                    mode={mode}
                                    display="default"
                                    onChange={onChange}
                                    />
                                    <Button title="Done" onPress={hideDatepicker}/>
                                </View>
                            )}
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
    }
})