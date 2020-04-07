import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../themes/variables';
import { Button } from 'react-native-paper';

export const ContinueButton = ({ onPress }) => (
    <View style={styles.buttonContainer}>
        <Button
            style={styles.continueButtonContainer}
            contentStyle={styles.continueButton}
            mode="contained"
            color={Colors.buttonPrimaryColor}
            labelStyle={styles.continueButtonText}
            onPress={onPress}>CONTINUAR</Button>
    </View>
);

export const ConfirmButton = ({ onPress }) => (
    <View style={styles.buttonContainer}>
        <Button
            style={styles.confirmButtonContainer}
            contentStyle={styles.confirmButton}
            mode="outlined"
            color={Colors.buttonPrimaryColor}
            labelStyle={styles.confirmButtonText}
            onPress={onPress}>SIM</Button >
    </View>
);

export const DenyButton = ({ onPress }) => (
    <View style={styles.buttonContainer}>
        <Button
            style={styles.denyButtonContainer}
            contentStyle={styles.denyButton}
            mode="outlined"
            color={Colors.buttonPrimaryColor}
            labelStyle={styles.denyButtonText}
            onPress={onPress}>SIM</Button >
    </View>
);

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        marginVertical: 30
    },
    continueButtonContainer: {
        width: "100%",
        borderRadius: 50,
    },
    continueButton: {
        height: 50,
        width: "100%",
        textAlign: "center"
    },
    continueButtonText: {
        color: Colors.primaryTextColor,
        fontFamily: Colors.fontFamily
    },

    confirmButtonContainer: {
        width: "100%",
        marginTop: 20,
        borderRadius: 50,
        borderColor: Colors.buttonPrimaryColor,
        borderWidth: 1
    },
    confirmButton: {
        height: 50,
        width: "100%",
        textAlign: "center",
    },
    confirmButtonText: {
        color: Colors.buttonPrimaryColor,
        fontFamily: Colors.fontFamily
    },

    denyButtonContainer: {
        width: "100%",
        marginTop: 20,
        borderRadius: 50,
        borderColor: Colors.navigatorIconColor,
        borderWidth: 1
    },
    denyButton: {
        height: 50,
        width: "100%",
        textAlign: "center",
    },
    denyButtonText: {
        color: Colors.navigatorIconColor,
        fontFamily: Colors.fontFamily
    },
});
