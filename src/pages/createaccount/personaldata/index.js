import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Avatar, Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';

export default class PersonalDataPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        photo: ""
    };
    componentDidMount() {
        let { navigation } = this.props;
        this.setState({
            photo: navigation.getParam('photo', "")
        });
    };
    render = () => {
        let { photo } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    backgroundColor={Colors.secondaryColor}
                    leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                    centerComponent={<CenterComponent photo={photo} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <View style={{ flex: 0.75, justifyContent: "center" }}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.simpleText]}><Text style={styles.boldText}>Ótimo!</Text> Caso queira, você</Text>
                        <Text style={[styles.simpleText]}>pode escolher outra foto ou</Text>
                        <Text style={[styles.simpleText]}>alterar depois em seu perfil.</Text>
                    </View>
                </View>
                <View style={{ flex: 0.25, width: "100%" }}>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.continueButtonContainer}
                            contentStyle={styles.continueButton}
                            mode="contained"
                            color={Colors.buttonPrimaryColor}
                            labelStyle={styles.continueButtonText}
                            onPress={this.openCamera}
                        >CONTINUAR</Button>
                    </View>
                    <ProgressTracking amount={7} position={1} />
                </View>
            </SafeAreaView >)
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
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
    },
    simpleText: {
        fontFamily: Colors.fontFamily,
        fontSize: 20
    },
    boldText: {
        fontWeight: "bold"
    },

    avatarContainer: {
        marginTop: 40,
        marginBottom: 20,
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
    },
    photoIcon: {
        position: "absolute",
        right: 0,
        bottom: 0
    }
});