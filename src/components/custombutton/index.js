import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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

export const ContinueRequiredButton = ({ disabled, onPress }) => (
    <View style={styles.buttonContainer}>
        <Button
            disabled={disabled}
            style={styles.continueButtonContainer}
            contentStyle={styles.continueButton}
            mode="contained"
            color={Colors.buttonPrimaryColor}
            labelStyle={styles.continueButtonText}
            onPress={onPress}>CONTINUAR</Button>
    </View>
);

export const ConfirmButton = ({ onPress }) => (
    <View style={styles.questionButtonContainer}>
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
    <View style={styles.questionButtonContainer}>
        <Button
            style={styles.denyButtonContainer}
            contentStyle={styles.denyButton}
            mode="outlined"
            color={Colors.buttonPrimaryColor}
            labelStyle={styles.denyButtonText}
            onPress={onPress}>NÃO</Button >
    </View>
);

export const UncontaminatedAnswerNowButton = ({ onPress }) => (
    <View style={styles.uncontaminatedButtonContainer}>
        <Button
            style={styles.uncontaminatedAnswerButtonContainer}
            contentStyle={styles.continueButton}
            mode="contained"
            color={Colors.secondaryColor}
            labelStyle={styles.uncontaminatedAnswerNowButtonText}
            onPress={onPress}>RESPONDER AGORA</Button>
    </View>
);

export const UncontaminatedAnswerLaterButton = ({ onPress }) => (
    <View style={styles.uncontaminatedButtonContainer}>
        <Button
            style={styles.uncontaminatedAnswerButtonContainer}
            contentStyle={styles.continueButton}
            mode="outlined"
            color={Colors.secondaryColor}
            labelStyle={styles.uncontaminatedAnswerLaterButtonText}
            onPress={onPress}>RESPONDER DEPOIS</Button>
    </View>
);

export const ContaminatedAnswerLaterButton = ({ onPress }) => (
    <View style={styles.uncontaminatedButtonContainer}>
        <Button
            style={styles.uncontaminatedAnswerButtonContainer}
            contentStyle={styles.continueButton}
            mode="outlined"
            color={Colors.secondaryColor}
            labelStyle={styles.uncontaminatedAnswerLaterButtonText}
            onPress={onPress}>RESPONDER DEPOIS</Button>
    </View>
);

export const ContaminatedAnswerNowButton = ({ onPress }) => (
    <View style={styles.uncontaminatedButtonContainer}>
        <Button
            style={styles.contaminatedAnswerButtonContainer}
            contentStyle={styles.continueButton}
            mode="contained"
            color={Colors.secondaryColor}
            labelStyle={styles.contaminatedAnswerNowButtonText}
            onPress={onPress}>RESPONDER AGORA</Button>
    </View>
);

export const DoubtButton = ({ onPress, label }) => (
    <TouchableOpacity onPress={onPress} style={styles.skipContainer}>
        <Button
            mode="text"
            color={Colors.defaultIconColor}
            labelStyle={styles.skipButtonText}
            uppercase={false}>{label}</Button>
    </TouchableOpacity>
);

export const DisclaimerButton = ({ onPress }) => (
    <View style={styles.disclaimerButtonContainer}>
        <Button
            style={styles.disclaimerButtonContainer}
            contentStyle={styles.continueButton}
            mode="outlined"
            color={Colors.secondaryColor}
            labelStyle={styles.disclaimerButtonText}
            onPress={onPress}>CONTINUAR</Button>
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

    questionButtonContainer: {
        width: "100%",
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

    skipButtonContainer: {
        width: "100%",
        borderRadius: 50,
    },
    skipButton: {
        height: 50,
        width: "100%",
        textAlign: "center"
    },
    skipButtonText: {
        fontFamily: Colors.fontFamily
    },
    skipContainer: {
        marginTop: 5,
        marginBottom: 10
    },

    uncontaminatedButtonContainer: {
        width: "100%",
        marginVertical: 10
    },
    uncontaminatedAnswerNowButtonText: {
        color: Colors.buttonPrimaryColor,
        fontFamily: Colors.fontFamily
    },

    contaminatedButtonContainer: {
        width: "100%",
        marginVertical: 10
    },
    contaminatedAnswerNowButtonText: {
        color: Colors.contaminatedColor,
        fontFamily: Colors.fontFamily
    },
    contaminatedAnswerButtonContainer: {
        width: "100%",
        borderRadius: 50,
        borderColor: Colors.secondaryColor,
        borderWidth: 1
    },

    uncontaminatedAnswerLaterButtonText: {
        color: Colors.secondaryColor,
        fontFamily: Colors.fontFamily
    },

    uncontaminatedAnswerButtonContainer: {
        width: "100%",
        borderRadius: 50,
        borderColor: Colors.secondaryColor,
        borderWidth: 1
    },

    disclaimerButtonContainer: {
        width: "100%",
        marginVertical: 10
    },

    disclaimerButtonText: {
        color: Colors.secondaryColor,
        fontFamily: Colors.fontFamily
    },

    disclaimerButtonContainer: {
        width: "100%",
        borderRadius: 50,
        borderColor: Colors.secondaryColor,
        borderWidth: 1
    },

});
