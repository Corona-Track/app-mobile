import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueButton } from '../../../components/custombutton';
import { SimpleTextInput, PasswordTextInput, CPFTextInput, SimpleDateTextInput } from '../../../components/customtextinput';


export default class PersonalDataPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        entity: {
            photo: "",
            name: "",
            cpf: "",
            birthday: null
        },
        showBirthday: false
    };
    componentDidMount() {
        let { navigation } = this.props;
        let { entity } = this.state;
        entity.photo = navigation.getParam('photo', "");
        this.setState({ entity });
    };
    render = () => {
        let { entity, showBirthday } = this.state;
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
                        label="Nome Completo"
                        value={entity.name}
                        onChangeText={this.onHandleName} />
                    <CPFTextInput
                        label="CPF"
                        value={entity.cpf}
                        onChangeText={this.onHandleCPF} />

                    <SimpleDateTextInput
                        label="Data de Nascimento"
                        value={entity.birthday}
                        onPress={this.onPressBirthdayPicker}
                        showDatePicker={showBirthday}
                        onChangeDate={this.onHandleDate}
                    />


                    <ContinueButton onPress={this.onContinueButtonClick} />
                    <ProgressTracking amount={7} position={2} />
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

    onHandleName = name => {
        let { entity } = this.state;
        entity.name = name;
        this.setState({ entity });
    };
    onHandleCPF = cpf => {
        let { entity } = this.state;
        entity.cpf = cpf;
        this.setState({ entity });
    };
    onPressBirthdayPicker = () => {
        this.setState({ showBirthday: true });
    };
    onHandleDate = (event, date) => {
        let { entity } = this.state;
        entity.birthday = date ?? entity.birthday;;
        this.setState({
            entity: entity,
            showBirthday: false
        });
    };

};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Agora precisamos saber</Text>
        <Text style={[styles.simpleText]}>um pouco mais sobre você</Text>
        <Text style={[styles.simpleText]}>e <Text style={styles.boldText}>seus dados pessoais.</Text></Text>
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