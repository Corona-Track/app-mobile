import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Avatar, Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ConfirmButton, DenyButton, DoubtButton } from '../../../components/custombutton';
import { SimpleTextInput } from '../../../components/customtextinput';
import { NavigationEvents } from 'react-navigation';
import { ImageIcon } from '../../../components/customimageicon';
export default class AlreadyHadCoronavirusPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
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
                    centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <View style={{ flex: 0.60, justifyContent: "center" }}>
                    <IntroText />
                    <View style={styles.avatarContainer}>
                        <ImageIcon source={require('../../../assets/images/virus.png')} />
                    </View>
                </View>
                <View style={{ flex: 0.40, width: "100%" }}>
                    <DenyButton onPress={() => { this.onAnswerButtonPress("deny") }} />
                    <ConfirmButton onPress={() => { this.onAnswerButtonPress("confirm") }} />
                    <DoubtButton onPress={() => { this.onAnswerButtonPress("doubt") }} label="Não tenho certeza" />
                    <ProgressTracking amount={7} position={4} />
                </View>
            </SafeAreaView >
        )
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    onAnswerButtonPress = answer => {
        let { entity } = this.state;
        entity.alreadyHadCoronavirus = answer;
        this.setState({ entity });
        this.props.navigation.navigate("SomeoneDiagnosed", { entity: entity });
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
        <Text style={[styles.simpleText, styles.boldText]}>Você já teve Coronavírus</Text>
        <Text style={[styles.simpleText]}>confirmado por teste?</Text>
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
    avatarContainerIcon: {
        backgroundColor: Colors.questionCenterIconColor,

    },
    avatarContainer: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: "center",
    },
});