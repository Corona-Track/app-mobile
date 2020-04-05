import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Avatar, Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../themes/variables';
import ProgressTracking from '../../components/progresstracking';
import { RightComponent } from '../../components/customheader';
import { CustomUserCamera } from '../../components/modals/customusercamera';

export default class CreateAccountPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    state = {
        isCameraVisible: false,
        photo: ""
    };
    componentDidMount() {
    };
    render = () => {
        let { isCameraVisible } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    backgroundColor={Colors.secondaryColor}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <View style={{ flex: 0.8, justifyContent: "center" }}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.simpleText]}>Para iniciar seu cadastro,</Text>
                        <Text style={[styles.simpleText]}>é necessário ter uma</Text>
                        <Text style={[styles.simpleText, styles.boldText]}>foto de perfil</Text>
                        <TouchableOpacity onPress={this.openCamera} style={styles.avatarContainer}>
                            <Avatar
                                size={200}
                                rounded
                                overlayContainerStyle={styles.avatarContainerIcon}
                                icon={{ name: 'camera-outline', type: 'material-community', color: Colors.defaultIconColor, size: 50 }} />
                        </TouchableOpacity>
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
                            onPress={this.openCamera}
                        >CONTINUAR</Button>
                    </View>
                    <ProgressTracking amount={7} position={1} />
                </View>
                <CustomUserCamera
                    onChangePhoto={this.onChangePhoto}
                    isVisible={isCameraVisible}
                    onCloseCamera={this.onCloseCamera} />
            </SafeAreaView>
        )
    };
    openCamera = () => {
        this.setState({
            isCameraVisible: true,
            photo: null
        });
    };
    onCloseCamera = () => {
        this.setState({
            isCameraVisible: false
        });
    };
    onPhotoTook = (photo) => {
        this.props.navigation.navigate("TookPhoto", { photo: photo });
    };
    onChangePhoto = newPhoto => {
        this.setState({
            photo: newPhoto,
            isCameraVisible: false
        });
        this.onPhotoTook(newPhoto);
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
        paddingHorizontal: 20
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
        marginVertical: 40
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