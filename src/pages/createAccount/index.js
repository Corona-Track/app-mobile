import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../themes/variables';
import ProgressTracking from '../../components/progresstracking';

export default class CreateAccountPage extends Component {
    static navigationOptions = {
        headerShown: false
    };
    state = {
    };
    componentDidMount() {
    };
    render = () => {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 0.8, justifyContent: "center" }}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.simpleText]}>Para iniciar seu cadastro,</Text>
                        <Text style={[styles.simpleText]}> é necessário ter uma</Text>
                        <Text style={[styles.simpleText, styles.boldText]}> foto de perfil</Text>
                        <View style={styles.avatarContainer}>
                            <Avatar
                                size={225}
                                rounded
                                overlayContainerStyle={styles.avatarContainerIcon}
                                icon={{ name: 'camera-outline', type: 'material-community', color: Colors.defaultIconColor, size: 50 }} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.2, width: "100%" }}>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.continueButtonContainer}
                            contentStyle={styles.continueButton}
                            mode="contained"
                            color={Colors.buttonPrimaryColor}
                            labelStyle={styles.continueButtonText}
                        >CONTINUAR</Button>
                    </View>
                    <ProgressTracking amount={8} position={1} />
                </View>
            </SafeAreaView >)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.secondaryColor,
        height: "100%",
        marginHorizontal: 20
    },
    logo: {
        height: 150,
        width: 210,
    },
    avatarContainerIcon: {
        backgroundColor: Colors.secondaryColor,
        borderColor: Colors.defaultIconColor,
        borderWidth: 3
    },
    textContainer: {
        alignItems: "center",
        marginTop: 75
    },
    simpleText: {
        fontFamily: Colors.fontFamily,
        fontSize: 20
    },
    boldText: {
        fontWeight: "bold"
    },

    avatarContainer: {
        marginVertical: 50
    },

    buttonContainer: {
        width: "100%",
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