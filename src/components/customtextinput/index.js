import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes/variables';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export const SimpleTextInput = ({ label, value, onChangeText }) => (
    <TextInput
        label={label}
        style={styles.input}
        value={value}
        theme={{ colors: { primary: Colors.inputPrimaryColor, placeholder: Colors.placeholderTextColor } }}
        maxLength={40}
        mode="outlined"
        onChangeText={onChangeText} />
);

export const PasswordTextInput = ({ label, value, onChangeText }) => (
    <TextInput
        label={label}
        style={styles.input}
        value={value}
        theme={{ colors: { primary: Colors.inputPrimaryColor, placeholder: Colors.placeholderTextColor } }}
        maxLength={40}
        secureTextEntry={true}
        mode="outlined"
        onChangeText={onChangeText} />
);

export const CPFTextInput = ({ label, value, onChangeText }) => (
    <TextInput
        label={label}
        style={styles.input}
        value={value}
        theme={{ colors: { primary: Colors.inputPrimaryColor, placeholder: Colors.placeholderTextColor } }}
        maxLength={40}
        mode="outlined"
        onChangeText={onChangeText}
        render={props =>
            <TextInputMask
                {...props}
                type={'cpf'}
            />
        } />
);

export const SimpleDateTextInput = ({ label, value, onPress, showDatePicker, onChangeDate }) => {
    let convertedValue = value ? moment(value).format("DD/MM/YYYY") : "";
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <TextInput
                    label={label}
                    editable={false}
                    style={styles.input}
                    value={convertedValue}
                    theme={{ colors: { primary: Colors.inputPrimaryColor, placeholder: Colors.placeholderTextColor } }}
                    maxLength={40}
                    mode="outlined" />
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
    <TextInput
        label={label}
        style={styles.input}
        value={value}
        theme={{ colors: { primary: Colors.inputPrimaryColor, placeholder: Colors.placeholderTextColor } }}
        maxLength={40}
        mode="outlined"
        onChangeText={onChangeText}
        render={props =>
            <TextInputMask
                {...props}
                type={'cel-phone'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
            />
        } />
);

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: "100%",
        marginTop: 15,
    }
});
