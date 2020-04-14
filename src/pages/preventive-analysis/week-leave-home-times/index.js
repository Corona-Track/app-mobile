import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header, Slider } from 'react-native-elements';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueButton } from '../../../components/custombutton';
import { NavigationEvents } from 'react-navigation';

export default class WeekLeaveHomeTimesPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        photo: PropTypes.any,
    }
    state = {
        entity: {
            daysAWeek: 0,
            reasonToLeaveHome: ""
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
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                        <Text style={[styles.simpleText]}>Número de dias da semana: {this.state.entity.daysAWeek}</Text>
                        <Slider
                            value={entity.daysAWeek}
                            minimumTrackTintColor="#EA5B2D"
                            thumbTintColor="#f56f45"
                            onValueChange={this.onHandleDaysAWeek}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.simpleText]}>Principal motivo</Text>
                    <Text style={[styles.simpleText]}>para sair de casa</Text>
                </View>
                <View>
                    <RadioButton.Group
                        onValueChange={value => this.setState({ value })}
                        value={this.state.entity.reasonToLeaveHome}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="work"
                                color={Colors.navigatorIconColor}
                            />
                            <Text style={{color:Colors.notMainText}}>Trabalhar</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton 
                                value="food"
                                color={Colors.navigatorIconColor}
                            />
                            <Text style={{color:Colors.notMainText}}>Comprar remédios ou alimentos</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton 
                                value="other"
                                color={Colors.navigatorIconColor}
                            />
                            <Text style={{color:Colors.notMainText}}>Outros motivos</Text>
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
                    <ProgressTracking amount={10} position={2} />
                </View>
            </SafeAreaView >)
    };
    onHandleDaysAWeek = daysAWeek => {
        let { entity } = this.state;
        entity.daysAWeek = daysAWeek;
        this.setState({ entity });
    }
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    onContinueButtonClick = () => {
        let { entity } = this.state;
        this.props.navigation.navigate("SocialDistance", { entity: entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Quantas vezes por semana</Text>
        <Text style={[styles.simpleText]}>você <Text style={styles.boldText}>sai de casa?</Text></Text>
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