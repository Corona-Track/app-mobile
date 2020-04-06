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
});
