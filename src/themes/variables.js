import {Platform} from 'react-native';

export const Colors = {
  primaryColor: '#EE7600',
  primaryTextColor: '#FFFFFF',
  placeholderTextColor: '#7E7D7D',
  secondaryColor: '#F5F5F5',
  inputPrimaryColor: '#54C6CF',
  buttonPrimaryColor: '#26B3C1',
  fontFamily: Platform.OS === 'android' ? 'Prompt-Light' : 'Prompt',
  defaultIconColor: '#BDBDBD',
  navigatorIconColor: '#EA5B2D',
  questionCenterIconColor: '#E9F7F9',
  notMainText: '#828282',
  searchBackgroundColor: '#e5e5e5',
  searchIconColor: '#E0E0E0',
  contaminatedColor: '#DE4D4D',
  errorColor: '#e74c3c',
  greenRiskProfile: '#27AE60',
  yellowRiskProfile: '#FFC700',
  redRiskProfile: '#FF0000',
};
