import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueButton } from '../../../components/custombutton';
import { NavigationEvents } from 'react-navigation';

export default class HomePrecautionPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        entity: {
            showerAnswer: "",
            changeClothesAnswer: "",
            containerCleanupAnswer: ""
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
                    
                    <View style={{alignItems: "center"}}>
                        <Text style={{color:Colors.notMainText}}>Quantas pessoas saem de casa?</Text>

                        <RadioButton.Group
                            onValueChange={value => this.setState({ value })}
                            value={this.state.entity.showerAnswer}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="always"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>Sempre</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton 
                                    value="sometimes"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>As Vezes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton 
                                    value="never"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>Nunca</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={{color:Colors.notMainText}}>Quantas pessoas saem de casa?</Text>

                        <RadioButton.Group
                            onValueChange={value => this.setState({ value })}
                            value={this.state.entity.changeClothesAnswer}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="always"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>Sempre</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton 
                                    value="sometimes"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>As Vezes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton 
                                    value="never"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>Nunca</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={{color:Colors.notMainText}}>Quantas pessoas saem de casa?</Text>

                        <RadioButton.Group
                            onValueChange={value => this.setState({ value })}
                            value={this.state.entity.containerCleanupAnswer}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="always"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>Sempre</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton 
                                    value="sometimes"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>As Vezes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton 
                                    value="never"
                                    color={Colors.navigatorIconColor}
                                />
                                <Text style={{color:Colors.notMainText}}>Nunca</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
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
                    <ProgressTracking amount={11} position={6} />
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
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>Cuidados ao entrar em casa</Text></Text>
        <Text style={[styles.simpleText]}>para proteger outros moradores</Text>
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