import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueButton } from '../../../components/custombutton';
import { NavigationEvents } from 'react-navigation';

export default class ProtectionUsagePage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        entity: {
            protectionAnswer: "",
        },
    };
    initialize(props) {
        if (!props)
            return;
        let { entity } = this.state;
        this.setState({ entity });
    };
    render = () => {
        let { entity } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <Header
                    backgroundColor={Colors.secondaryColor}
                    leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                    centerComponent={<CenterComponent photo={entity.photo} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <View style={{ width: "100%" }}>
                    <IntroText />
                    <RadioButton.Group
                        onValueChange={value => this.setState({ value })}
                        value={this.state.entity.protectionAnswer}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{color:Colors.notMainText}}>Uso sempre proteção de rosto (garrafa pet ou similares)</Text>
                            <RadioButton
                                value="facial_protection"
                                color={Colors.navigatorIconColor}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{color:Colors.notMainText}}>Uso sempre máscara (cirúrgica ou caseira)</Text>
                            <RadioButton 
                                value="cirurgical_mask"
                                color={Colors.navigatorIconColor}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{color:Colors.notMainText}}>Não costumo usar nenhum tipo de proteção ao sair de casa</Text>
                            <RadioButton 
                                value="no_protection"
                                color={Colors.navigatorIconColor}
                            />
                        </View>
                    </RadioButton.Group>
                </View>
                <View>
                    <ContinueButton onPress={this.onContinueButtonClick} />
                    <TouchableOpacity onPress={this.skipScreen} style={styles.skipContainer}>
                        <Button
                            mode="text"
                            color={Colors.defaultIconColor}
                            labelStyle={styles.skipButtonText}
                            uppercase={false}>Responder Depois</Button>
                    </TouchableOpacity>
                    <ProgressTracking amount={10} position={4} />
                </View>
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
        this.props.navigation.navigate("TouchingPrecaution", { entity: entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Sobre o <Text style={styles.boldText}>uso de proteção.</Text></Text>
        <Text style={[styles.simpleText]}>Quando saio de casa:</Text>
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