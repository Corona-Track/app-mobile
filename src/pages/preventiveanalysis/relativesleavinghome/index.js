import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ContinueButton } from '../../../components/custombutton';
import { NavigationEvents } from 'react-navigation';

export default class RelativesLeavingHomePage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            relativesLeavingHome: null,
            howManyRelatives: "",
            relativesLeavingTimes: "",
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

                    <View>
                        <RadioButton.Group
                            onValueChange={value => this.setState({ value })}
                            value={this.state.entity.relativesLeavingHome}
                        >
                            <View style={{ width: "100%", flex: 1, flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value={true}
                                        color={Colors.navigatorIconColor}
                                    />
                                    <Text style={{color:Colors.notMainText}}>SIM</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton 
                                        value={false}
                                        color={Colors.navigatorIconColor}
                                    />
                                    <Text style={{color:Colors.notMainText}}>NÃO</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{alignItems: "center"}}>
                        <Text style={{color:Colors.notMainText}}>Quantas pessoas saem de casa?</Text>
                        <HowManyPeopleLeaveBox />
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={{color:Colors.notMainText}}>Quantas vezes saem de casa por semana?</Text>
                        <HowManyTimesPeopleLeaveBox />
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
                    <ProgressTracking amount={10} position={8} />
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
        this.props.navigation.navigate("RelativesHomePrecautions", { entity: entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Você mora com pessoas que</Text>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>saem de casa</Text> durante</Text>
        <Text style={[styles.simpleText]}>a pandemia?</Text>
    </View>
);

const HowManyPeopleLeaveBox = () => {
    <RadioButton.Group
        disabled={!this.state.entity.relativesLeavingHome}
        onValueChange={value => this.setState({ value })}
        value={this.state.entity.howManyRelatives}
    >
        <QuantityPeopleOptions />
    </RadioButton.Group>
}

const HowManyTimesPeopleLeaveBox = () => {
	<RadioButton.Group
		disabled={!this.state.entity.relativesLeavingHome}
		onValueChange={value => this.setState({ value })}
		value={this.state.entity.relativesLeavingTimes}
	>
		<QuantityPeopleOptions />
	</RadioButton.Group>
}

const QuantityPeopleOptions = () => {
    <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
                value="one"
                color={Colors.navigatorIconColor}
            />
                <Text style={{color:Colors.notMainText}}>Uma</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton 
                value="two"
                color={Colors.navigatorIconColor}
            />
                <Text style={{color:Colors.notMainText}}>Duas</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton 
                value="three_or_more"
                color={Colors.navigatorIconColor}
            />
                <Text style={{color:Colors.notMainText}}>Três ou mais</Text>
        </View>
    </View>
}

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