import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueButton } from '../../../components/custombutton';
import { NavigationEvents } from 'react-navigation';

export default class TouchingPrecautionPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        entity: {
            touchingPrecaution: ""
        },
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
                        value={this.state.entity.touchingPrecaution}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="gloves_or_paper"
                                color={Colors.navigatorIconColor}
                            />
                            <Text style={{color:Colors.notMainText}}>Uso luva ou papel descartável para não contaminar as mãos</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton 
                                value="infected_alcohol"
                                color={Colors.navigatorIconColor}
                            />
                            <Text style={{color:Colors.notMainText}}>Contamino as mãos e limpo em seguida com álcool em gel</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton 
                                value="infected_restless"
                                color={Colors.navigatorIconColor}
                            />
                            <Text style={{color:Colors.notMainText}}>Contamino as mãos e fico inquieto enquanto não as lavo</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton 
                                value="infected_clean_when_can"
                                color={Colors.navigatorIconColor}
                            />
                            <Text style={{color:Colors.notMainText}}>Contamino as mãos e limpo quando posso</Text>
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
                    <ProgressTracking amount={10} position={5} />
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
        this.props.navigation.navigate("HomePrecautions", { entity: entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Ao sair de casa, e <Text style={styles.boldText}>encosto em</Text></Text>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>algo provavelmente infectado,</Text></Text>
        <Text style={[styles.simpleText]}>como maçaneta, corrimão, etc:</Text>
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