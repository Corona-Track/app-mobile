import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { Colors } from '../../themes/variables';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from "react-native-vector-icons/MaterialIcons";

export const SimpleTextInput = ({ label, value, onChangeText }) => (
    <View style={styles.inputContainer}>
        <TextInput
            placeholderTextColor={Colors.placeholderTextColor}
            placeholder={label}
            style={styles.input}
            value={value}
            maxLength={40}
            onChangeText={onChangeText} />
    </View>
);

export const SimpleNumericTextInput = ({ label, value, onChangeText }) => (
    <View style={styles.inputContainer}>
        <TextInput
            placeholderTextColor={Colors.placeholderTextColor}
            placeholder={label}
            keyboardType='numeric'
            style={styles.input}
            value={value}
            maxLength={40}
            onChangeText={onChangeText} />
    </View>
);

export const PasswordTextInput = ({ label, value, onChangeText }) => (
    <View style={styles.inputContainer}>
        <TextInput
            placeholderTextColor={Colors.placeholderTextColor}
            secureTextEntry={true}
            placeholder={label}
            style={styles.input}
            value={value}
            maxLength={40}
            onChangeText={onChangeText} />
    </View>
);

export const CPFTextInput = ({ label, value, onChangeText }) => (
    <View style={styles.inputContainer}>
        <TextInputMask
            placeholderTextColor={Colors.placeholderTextColor}
            type={'cpf'}
            placeholder={label}
            style={styles.input}
            value={value}
            maxLength={40}
            onChangeText={onChangeText} />
    </View>
);

export const CEPTextInput = ({ label, value, onChangeText }) => (
    <View style={styles.inputContainer}>
        <TextInputMask
            placeholderTextColor={Colors.placeholderTextColor}
            type={'zip-code'}
            placeholder={label}
            style={styles.input}
            value={value}
            maxLength={40}
            onChangeText={onChangeText} />
    </View>
);

export const SimpleDateTextInput = ({ label, value, onPress, showDatePicker, onChangeDate }) => {
    let convertedValue = value ? moment(value).format("DD/MM/YYYY") : "";
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.inputDropDownContainer}>
                    <View style={styles.input}>
                        {convertedValue ?
                            <Text style={styles.inputDropDownText}>{convertedValue}</Text> :
                            <Text style={[styles.inputDropDownText, { color: Colors.placeholderTextColor }]}>{label}</Text>
                        }
                    </View>
                </View>
            </TouchableOpacity>
            {showDatePicker &&
                <DateTimePicker
                    value={value ?? new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate} />}
        </>);
};

export const PhoneTextInput = ({ label, value, onChangeText }) => (
    <View style={styles.inputContainer}>
        <TextInputMask
            placeholderTextColor={Colors.placeholderTextColor}
            type={'cel-phone'}
            options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
            }}
            placeholder={label}
            style={styles.input}
            value={value}
            maxLength={40}
            onChangeText={onChangeText} />
    </View>
);

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: "100%",
        fontFamily: Colors.fontFamily,
    },
    inputContainer: {
        fontFamily: Colors.fontFamily,
        borderColor: Colors.placeholderTextColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 6,
        marginTop: 15
    },
    inputLabel: {
        position: "absolute",
        left: 8,
        top: -8,
        paddingHorizontal: 2,
        fontSize: 12,
        backgroundColor: Colors.secondaryColor,
        fontFamily: Colors.fontFamily
    },
    inputDropDownText: {
        width: "100%",
        marginTop: 15,
        fontFamily: Colors.fontFamily,
    },
    inputDropDownContainer: {
        fontFamily: Colors.fontFamily,
        borderColor: Colors.placeholderTextColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 11,
        marginTop: 15
    },
});
