import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton } from '../../../components/custombutton';
import { RadioButtonYesOrNoItem } from '../../../components/customcheckboxitem';
import { SimpleCenterDateTextInput } from '../../../components/customtextinput';
export default class TestResultPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            testResult: "",
            testDate: null
        },
        showTestDate: false
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
        let { entity, showTestDate } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <View style={{ flex: 0.75, width: "100%" }}>
                    <View style={{ width: "100%", paddingHorizontal: 25 }}>
                        <Header
                            backgroundColor={Colors.secondaryColor}
                            leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                            centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                            rightComponent={<RightComponent onPress={this.onRightButtonPress} />} />
                    </View>
                    <IntroText />
                    <View style={{ alignSelf: "center", height: 70 }}>
                        <RadioButtonYesOrNoItem
                            value={entity.testResult}
                            onPressCheckbox={this.onPressCheckbox} />
                    </View>
                    {entity.testResult ? (
                        <View style={{ backgroundColor: Colors.searchBackgroundColor, width: "100%", paddingHorizontal: 25, paddingVertical: 35 }}>
                            <Text style={{ width: "100%", textAlign: "center", fontFamily: Colors.fontFamily, color: "#828282", fontSize: 16 }}><Text style={styles.boldText}>Quando realizou o teste?</Text></Text>
                            <SimpleCenterDateTextInput
                                label="Selecione"
                                value={entity.testDate}
                                onPress={this.onPressTestDatePicker}
                                showDatePicker={showTestDate}
                                onChangeDate={this.onHandleDate} />
                        </View>) : (<></>)}
                </View>
                <View style={{ flex: 0.25, width: "100%", paddingHorizontal: 25 }}>
                    <ContinueRequiredButton
                        onPress={() => { this.onContinuePress() }}
                        disabled={this.disableButton()} />
                </View>
                <ProgressTracking amount={7} position={4} />
            </SafeAreaView >
        )
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    onContinuePress = () => {
        let { entity } = this.state;
        this.props.navigation.navigate("Comorbidities", { entity: entity });
    };
    onPressCheckbox = value => {
        let { entity } = this.state;
        entity.testResult = value;
        entity.testDate = null;
        this.setState({ entity });
    };
    onPressTestDatePicker = () => {
        this.setState({ showTestDate: true });
    };
    onHandleDate = (event, date) => {
        let { entity } = this.state;
        entity.testDate = date ?? entity.testDate;;
        this.setState({
            entity: entity,
            showTestDate: false
        });
    };
    disableButton = () => {
        let { entity } = this.state;
        return !((entity.testResult === true && entity.testDate) || entity.testResult === false);
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>O seu teste <Text style={styles.boldText}>foi positivo?</Text></Text>
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
    avatarContainer: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: "center",
    },
});