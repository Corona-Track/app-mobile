import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { RadioButtonYesOrNoItem } from '../../../components/customcheckboxitem';

export default class AlreadyHadFluVaccinePage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            hadFluVaccine: null,
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
                <View style={{ flex: 0.75, width: "100%" }}>
                    <View style={{ width: "100%", paddingHorizontal: 20 }}>
                        <Header
                            backgroundColor={Colors.secondaryColor}
                            leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                            centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                            rightComponent={<RightComponent onPress={this.onRightButtonPress} />} />
                    </View>
                    <IntroText />
                    <View style={{ alignSelf: "center", height: 70 }}>
                        <RadioButtonYesOrNoItem
                            noTitle="Ainda NÃO"
                            value={entity.hadFluVaccine}
                            onPressCheckbox={this.onPressCheckbox} />
                    </View>
                </View>
                <View style={{ flex: 0.25, width: "100%", paddingHorizontal: 20, justifyContent: "flex-end" }}>
                    <ContinueRequiredButton
                        onPress={() => { this.onContinueButtonClick() }}
                        disabled={this.disableButton()} />
                    {!entity.contaminated ?
                        (<DoubtButton onPress={() => { this.onDoubtPress() }} label="Responder depois" />)
                        : (<></>)}
                </View>
                <ProgressTracking amount={10} position={2} />
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
        this.props.navigation.navigate("WeekLeaveHomeTimes", { entity: entity });
    };
    onPressCheckbox = value => {
        let { entity } = this.state;
        entity.hadFluVaccine = value;
        this.setState({ entity });
    };
    disableButton = () => {
        let { entity } = this.state;
        return !(entity.hadFluVaccine !== null);
    };
    onDoubtPress = () => {
        let { entity } = this.state;
        entity.hadFluVaccine = null;
        entity.skippedAnswer = true;
        this.setState({ entity });
        this.props.navigation.navigate("WeekLeaveHomeTimes", { entity: entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Você já tomou a <Text style={styles.boldText}>vacina</Text></Text>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>da gripe</Text> de 2020?</Text>
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
    skipContainer: {
        marginTop: 5,
    },
});