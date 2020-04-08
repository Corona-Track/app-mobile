import { Platform } from 'react-native';

export const Colors = {
    primaryColor: "#EE7600",
    primaryTextColor: "#FFFFFF",
    placeholderTextColor: "#7E7D7D",
    secondaryColor: "#F5F5F5",
    inputPrimaryColor: "#54C6CF",
    buttonPrimaryColor: "#26B3C1",
    fontFamily: Platform.OS === "android" ? "Prompt-Light" : "Prompt",
    defaultIconColor: "#BDBDBD",
    navigatorIconColor: "#EA5B2D",
    notMainText: "#828282"
};