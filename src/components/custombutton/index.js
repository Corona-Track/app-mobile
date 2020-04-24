import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors} from '../../themes/variables';
import {Button} from 'react-native-paper';

export const ContinueButton = ({onPress}) => (
  <View style={styles.buttonContainer}>
    <Button
      style={styles.continueButtonContainer}
      contentStyle={styles.continueButton}
      mode="contained"
      color={Colors.buttonPrimaryColor}
      labelStyle={styles.continueButtonText}
      onPress={onPress}>
      CONTINUAR
    </Button>
  </View>
);

export const ContinueRequiredButton = ({disabled, onPress}) => (
  <View style={styles.buttonContainer}>
    <Button
      disabled={disabled}
      style={styles.continueButtonContainer}
      contentStyle={styles.continueButton}
      mode="contained"
      color={Colors.greenLight}
      labelStyle={styles.continueButtonText}
      onPress={onPress}>
      CONTINUAR
    </Button>
  </View>
);

export const ConfirmButton = ({onPress}) => (
  <View style={styles.questionButtonContainer}>
    <Button
      style={styles.confirmButtonContainer}
      contentStyle={styles.confirmButton}
      mode="outlined"
      color={Colors.buttonPrimaryColor}
      labelStyle={styles.confirmButtonText}
      onPress={onPress}>
      SIM
    </Button>
  </View>
);

export const DenyButton = ({onPress}) => (
  <View style={styles.questionButtonContainer}>
    <Button
      style={styles.denyButtonContainer}
      contentStyle={styles.denyButton}
      mode="outlined"
      color={Colors.buttonPrimaryColor}
      labelStyle={styles.denyButtonText}
      onPress={onPress}>
      NÃO
    </Button>
  </View>
);

export const UncontaminatedAnswerNowButton = ({onPress}) => (
  <View style={styles.uncontaminatedButtonContainer}>
    <Button
      style={styles.uncontaminatedAnswerButtonContainer}
      contentStyle={styles.continueButton}
      mode="contained"
      color={Colors.secondaryColor}
      labelStyle={styles.uncontaminatedAnswerNowButtonText}
      onPress={onPress}>
      RESPONDER AGORA
    </Button>
  </View>
);

export const UncontaminatedAnswerLaterButton = ({onPress}) => (
  <View style={styles.uncontaminatedButtonContainer}>
    <Button
      style={styles.uncontaminatedAnswerButtonContainer}
      contentStyle={styles.continueButton}
      mode="outlined"
      color={Colors.secondaryColor}
      labelStyle={styles.uncontaminatedAnswerLaterButtonText}
      onPress={onPress}>
      RESPONDER DEPOIS
    </Button>
  </View>
);

export const ContaminatedAnswerLaterButton = ({onPress}) => (
  <View style={styles.uncontaminatedButtonContainer}>
    <Button
      style={styles.uncontaminatedAnswerButtonContainer}
      contentStyle={styles.continueButton}
      mode="outlined"
      color={Colors.secondaryColor}
      labelStyle={styles.uncontaminatedAnswerLaterButtonText}
      onPress={onPress}>
      RESPONDER DEPOIS
    </Button>
  </View>
);

export const ContaminatedAnswerNowButton = ({onPress}) => (
  <View style={styles.uncontaminatedButtonContainer}>
    <Button
      style={styles.contaminatedAnswerButtonContainer}
      contentStyle={styles.continueButton}
      mode="contained"
      color={Colors.secondaryColor}
      labelStyle={styles.contaminatedAnswerNowButtonText}
      onPress={onPress}>
      RESPONDER AGORA
    </Button>
  </View>
);

export const DoubtButton = ({onPress, label}) => (
  <TouchableOpacity onPress={onPress} style={styles.skipContainer}>
    <Button
      mode="text"
      color={Colors.defaultIconColor}
      labelStyle={styles.skipButtonText}
      uppercase={false}>
      {label}
    </Button>
  </TouchableOpacity>
);

export const DisclaimerButton = ({onPress}) => (
  <View style={styles.disclaimerButtonContainer}>
    <Button
      style={styles.disclaimerButtonContainer}
      contentStyle={styles.continueButton}
      mode="outlined"
      color={Colors.secondaryColor}
      labelStyle={styles.disclaimerButtonText}
      onPress={onPress}>
      CONTINUAR
    </Button>
  </View>
);

export const FinishRemainingButton = ({onPress}) => (
  <View style={styles.finishRemainingButtonContainer}>
    <Button
      style={styles.finishRemainingAnswerButtonContainer}
      contentStyle={styles.continueButton}
      mode="contained"
      color={Colors.blue}
      labelStyle={styles.finishRemainingButtonText}
      onPress={onPress}>
      SAIR
    </Button>
  </View>
);

export const FinishCompleteButton = ({onPress}) => (
  <View style={styles.buttonContainer}>
    <Button
      style={styles.continueButtonContainer}
      contentStyle={styles.continueButton}
      mode="contained"
      color={Colors.greenLight}
      labelStyle={styles.continueButtonText}
      onPress={onPress}>
      CONCLUIR
    </Button>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  continueButtonContainer: {
    width: '100%',
    borderRadius: 50,
  },
  continueButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  continueButtonText: {
    color: Colors.primaryTextColor,
    fontWeight: '600',
    fontFamily: Colors.fontFamily,
  },

  questionButtonContainer: {
    width: '100%',
  },
  confirmButtonContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
    backgroundColor: Colors.greenLight,
    borderWidth: 0,
  },
  confirmButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
    fontWeight: 'bold',
  },

  denyButtonContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
    borderColor: Colors.blue,
    borderWidth: 1,
  },
  denyButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  denyButtonText: {
    color: Colors.blue,
    fontWeight: 'bold',
    fontFamily: Colors.fontFamily,
  },

  skipButtonContainer: {
    width: '100%',
    borderRadius: 50,
  },
  skipButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  skipButtonText: {
    fontFamily: Colors.fontFamily,
    fontWeight: '300',
  },
  skipContainer: {
    marginTop: 5,
    marginBottom: 10,
  },

  uncontaminatedButtonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  uncontaminatedAnswerNowButtonText: {
    color: Colors.blue,
    fontFamily: Colors.fontFamily,
    fontWeight: '600',
  },

  contaminatedButtonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  contaminatedAnswerNowButtonText: {
    color: Colors.contaminatedColor,
    fontFamily: Colors.fontFamily,
  },
  contaminatedAnswerButtonContainer: {
    width: '100%',
    borderRadius: 50,
    borderColor: Colors.secondaryColor,
    borderWidth: 1,
  },

  uncontaminatedAnswerLaterButtonText: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
    fontWeight: '600',
  },

  uncontaminatedAnswerButtonContainer: {
    width: '100%',
    borderRadius: 50,
    borderColor: Colors.secondaryColor,
    borderWidth: 1,
  },

  disclaimerButtonText: {
    color: Colors.blue,
    fontFamily: Colors.fontFamily,
  },

  disclaimerButtonContainer: {
    width: '100%',
    borderRadius: 50,
    borderColor: Colors.blue,
    borderWidth: 1,
  },

  finishRemainingButtonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  finishRemainingButtonText: {
    color: Colors.blue,
    fontFamily: Colors.fontFamily,
    fontWeight: '600',
  },

  finishRemainingAnswerButtonContainer: {
    width: '100%',
    borderRadius: 50,
    borderColor: Colors.secondaryColor,
    borderWidth: 1,
  },
});
