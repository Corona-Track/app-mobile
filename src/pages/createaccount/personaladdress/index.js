import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueButton } from '../../../components/custombutton';
import { SimpleTextInput } from '../../../components/customtextinput';

export default class PersonalAddressPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        entity: {
            cep: "",
            street: "",
            neighborhood: "",
            city: "",
            uf: "",
        },
    };
    componentDidMount() {
        let { navigation } = this.props;
        let { entity } = this.state;
        entity.photo = navigation.getParam('photo', "");
        this.setState({ entity });
    };
    render = () => {
        let { entity, showBirthday, showGenre, genreList, showPregnancy, pregnancyList } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    backgroundColor={Colors.secondaryColor}
                    leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                    centerComponent={<CenterComponent photo={entity.photo} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <ScrollView style={{ width: "100%" }}>
                    <IntroText />
                    <SimpleTextInput
                        label="CEP"
                        value={entity.cep}
                        onChangeText={this.onHandleCEP} />
                        <SimpleTextInput
                        label="Av, Rua"
                        value={entity.street}
                        onChangeText={this.onHandleStreet} />
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
                    <ContinueButton onPress={this.onContinueButtonClick} />
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
        <Text style={[styles.simpleText,styles.boldText]}>Muito bem, Maria!</Text>
        <Text style={[styles.simpleText]}>Agora nos diga, por favor,</Text>
        <Text style={[styles.simpleText]}>onde você mora.</Text>        
    </View>
);

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

    avatarContainer: {
        marginTop: 40,
        marginBottom: 20,
    },

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