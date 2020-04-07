import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ConfirmButton, DenyButton } from '../../../components/custombutton';
import { SimpleTextInput } from '../../../components/customtextinput';
import { NavigationEvents } from 'react-navigation';

export default class AlreadyHadCoronavirusPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        entity: {
            alreadyHadCoronavirus: "",
        },
    };
    initialize(props) {
        if (!props)
            return;
        let { navigation } = props;
        let { entity } = this.state;
        previousEntity = navigation.getParam('entity', null);
        if (!previousEntity)
            return;
        let converted = {
            ...entity,
            ...previousEntity
        };
        this.setState({ entity: converted });
    };
    render = () => {
        let { entity } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <Header
                    backgroundColor={Colors.secondaryColor}
                    leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                    centerComponent={<CenterComponent photo={entity.photo} userName={user.name} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <ScrollView style={{ width: "100%" }}>
                    <IntroText />

                    <ConfirmButton onPress={() => { }} />
                    <DenyButton onPress={() => { }} />
                    <ProgressTracking amount={7} position={4} />
                </ScrollView>
            </SafeAreaView >)
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    onContinueButtonClick = () => {

    };

    onHandleCEP = cep => {
        let { entity } = this.state;
        entity.cep = cep;
        this.setState({ entity });
    };
    onHandleStreet = street => {
        let { entity } = this.state;
        entity.street = street;
        this.setState({ entity });
    };
    onHandleNeighborhood = neighborhood => {
        let { entity } = this.state;
        entity.neighborhood = neighborhood;
        this.setState({ entity });
    };
    onHandleCity = city => {
        let { entity } = this.state;
        entity.city = city;
        this.setState({ entity });
    };
    onHandleUF = uf => {
        let { entity } = this.state;
        entity.uf = uf;
        this.setState({ entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText, styles.boldText]}>Muito bem, Maria!</Text>
        <Text style={[styles.simpleText]}>Agora nos diga, por favor,</Text>
        <Text style={[styles.simpleText]}>onde você mora.</Text>
    </View>
);

const GPSButton = ({ onGPSButtonPress }) => (
    <Button
        icon="crosshairs-gps"
        style={styles.GPSButtonContainer}
        contentStyle={styles.GPSButton}
        mode="outlined"
        color={Colors.buttonPrimaryColor}
        labelStyle={styles.GPSButtonText}
        onPress={onGPSButtonPress} > MINHA LOCALIZAÇÃO</Button >
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.secondaryColor,
        height: "100%",
        marginHorizontal: 20,
        paddingBottom: 15
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    simpleText: {
        fontFamily: Colors.fontFamily,
        fontSize: 20
    },
    boldText: {
        fontWeight: "bold"
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
    GPSButtonContainer: {
        width: "100%",
        marginTop: 20,
        borderRadius: 50,
        borderColor: Colors.buttonPrimaryColor,
        borderWidth: 1
    },
    GPSButton: {
        height: 50,
        width: "100%",
        textAlign: "center",
    },
    GPSButtonText: {
        color: Colors.buttonPrimaryColor,
        fontFamily: Colors.fontFamily
    },
});