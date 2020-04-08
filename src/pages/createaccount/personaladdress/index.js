import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView, PermissionsAndroid, Alert, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueRequiredButton } from '../../../components/custombutton';
import { SimpleTextInput, CEPTextInput, SimpleNumericTextInput } from '../../../components/customtextinput';
import { NavigationEvents } from 'react-navigation';
import Geolocation from 'react-native-geolocation-service';
import { getAddressDataByZipCode } from '../../../services/zipcodeservice';
import Spinner from 'react-native-loading-spinner-overlay';
import { cepValidator, getFirstName } from '../../../services/formvalidatorservice';

export default class PersonalAddressPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            cep: "",
            street: "",
            neighborhood: "",
            city: "",
            uf: "",
            number: "",
            hasPermissionLocation: false,
            latitude: "",
            longitude: ""
        },
        showLoading: false
    };
    initialize(props) {
        if (!props)
            return;
        let { navigation } = props;
        let { entity } = this.state;
        let previousEntity = navigation.getParam('entity', null);
        if (!previousEntity)
            return;
        let converted = {
            ...entity,
            ...previousEntity
        };
        this.setState({ entity: converted });
    };
    render = () => {
        let { entity, showLoading } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <Spinner visible={showLoading} />
                <Header
                    backgroundColor={Colors.secondaryColor}
                    leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                    centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <ScrollView style={{ width: "100%" }}>
                    <IntroText userName={entity.name} />
                    <GPSButton onGPSButtonPress={this.onGPSButtonPress} />
                    <CEPTextInput
                        label="CEP"
                        value={entity.cep}
                        onChangeText={this.onHandleCEP} />
                    <SimpleTextInput
                        label="Bairro"
                        value={entity.neighborhood}
                        onChangeText={this.onHandleNeighborhood} />
                    <SimpleTextInput
                        label="Cidade"
                        value={entity.city}
                        onChangeText={this.onHandleCity} />
                    <SimpleTextInput
                        label="UF"
                        value={entity.uf}
                        onChangeText={this.onHandleUF} />
                    <SimpleTextInput
                        label="Av, Rua"
                        value={entity.street}
                        onChangeText={this.onHandleStreet} />
                    <SimpleNumericTextInput
                        label="Número"
                        value={entity.number}
                        onChangeText={this.onHandleNumber}
                    />
                    <ContinueRequiredButton disabled={this.disableButton()} onPress={this.onContinueButtonClick} />
                    <ProgressTracking amount={7} position={3} />
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
        let { entity } = this.state;
        this.props.navigation.navigate("AlreadyHadCoronavirus", { entity: entity });
    };
    onHandleCEP = cep => {
        let { entity } = this.state;
        entity.cep = cep;
        this.setState({ entity });
        if (cepValidator(cep))
            this.getAddressDataFromZipCode(cep);
    };
    onHandleStreet = street => {
        let { entity } = this.state;
        entity.street = street;
        this.setState({ entity });
    };
    onHandleNumber = number => {
        let { entity } = this.state;
        entity.number = number;
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
    onGPSButtonPress = async () => {
        if (Platform.OS === "ios") {
            this.getLocation();
            return;
        }
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                'title': 'Acesso de localização',
                'message': 'Para buscar sua localização precisamos de sua permissão.'
            });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getLocation();
                return;
            }
            this.onGPSErrorMessage();
        } catch { this.onGPSErrorMessage(); }
    };
    onGPSErrorMessage = () => {
        this.setState({ hasPermissionLocation: false });
        Alert.alert(
            'Aviso!',
            "Falha ao acessar a sua localização, tente novamente mais tarde!",
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };
    getLocation = () => {
        this.setState({ hasPermissionLocation: true });
        Geolocation.getCurrentPosition(
            position => {
                let { entity } = this.state;
                entity.latitude = position.coords.latitude;
                entity.longitude = position.coords.longitude;
                this.setState({ entity });
            },
            error => {
                this.onGPSErrorMessage();
            }
        );
    };
    getAddressDataFromZipCode = (cep) => {
        this.showLoading();
        getAddressDataByZipCode(cep)
            .then(this.onGetAddressDataSuccess)
            .catch(this.onGetAddressDataFailure)
            .finally(this.hideLoading);
    };
    onGetAddressDataSuccess = (response) => {
        let { data } = response;
        let { entity } = this.state;
        entity.street = data.logradouro;
        entity.neighborhood = data.bairro;
        entity.city = data.localidade;
        entity.uf = data.uf;
        this.setState({ entity });
    };
    onGetAddressDataFailure = () => {
        Alert.alert(
            'Aviso!',
            "Falha buscar dados do endereço, tente novamente mais tarde!",
            [{ text: 'OK' }],
            { cancelable: false }
        );
    };
    //Loading
    showLoading = () => {
        this.setState({ showLoading: true });
    };
    hideLoading = () => {
        this.setState({ showLoading: false });
    };
    disableButton = () => {
        return !(this.isCepValid() &&
            this.isStreetValid() &&
            this.isNeighborhoodValid() &&
            this.isCityValid() &&
            this.isUfValid() &&
            this.isNumberValid()
            // this.isLatitudeValid() &&
            // this.isLongitudeValid()
            );
    };
    isCepValid = () => {
        let { cep } = this.state.entity;
        return cepValidator(cep);
    };
    isStreetValid = () => {
        let { street } = this.state.entity;
        return street ?? false;
    };
    isNeighborhoodValid = () => {
        let { neighborhood } = this.state.entity;
        return neighborhood ?? false;
    };
    isCityValid = () => {
        let { city } = this.state.entity;
        return city ?? false;
    };
    isUfValid = () => {
        let { uf } = this.state.entity;
        return uf ?? false;
    };
    isNumberValid = () => {
        let { number } = this.state.entity;
        return number ?? false;
    };
    isLatitudeValid = () => {
        let { latitude } = this.state.entity;
        return latitude ?? false;
    };
    isLongitudeValid = () => {
        let { longitude } = this.state.entity;
        return longitude ?? false;
    };
};

const IntroText = ({ userName }) => {
    return (<View style={styles.textContainer}>
        <Text style={[styles.simpleText, styles.boldText]}>Muito bem, {getFirstName(userName)}!</Text>
        <Text style={[styles.simpleText]}>Agora nos diga, por favor,</Text>
        <Text style={[styles.simpleText]}>onde você mora.</Text>
    </View>);
};

const GPSButton = ({ onGPSButtonPress }) => (
    <Button
        icon="crosshairs-gps"
        style={styles.GPSButtonContainer}
        contentStyle={styles.GPSButton}
        mode="outlined"
        color={Colors.buttonPrimaryColor}
        labelStyle={styles.GPSButtonText}
        onPress={onGPSButtonPress}>MINHA LOCALIZAÇÃO</Button >
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