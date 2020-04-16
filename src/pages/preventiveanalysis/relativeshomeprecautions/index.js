import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { RadioButtonTripleResizableItem, RadioButtonYesOrNoItem } from '../../../components/customcheckboxitem';

export default class RelativesHomePrecautionsPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            relativesShowerAnswer: null,
            relativesChangeClothesAnswer: null,
            relativesContainerCleanupAnswer: null
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
                <View style={{ flex: 0.8, width: "100%" }}>
                    <View style={{ width: "100%", paddingHorizontal: 20 }}>
                        <Header
                            backgroundColor={Colors.secondaryColor}
                            leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                            centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                            rightComponent={<RightComponent onPress={this.onRightButtonPress} />} />
                    </View>
                    <ScrollView>
                        <IntroText />
                        <View style={styles.radioButtonItemContainer}>
                            <HomeEnterText />
                            <View style={{ height: 50, justifyContent: "center" }}>
                                <RadioButtonTripleResizableItem
                                    value={entity.relativesShowerAnswer}
                                    onPressCheckbox={this.onChangeRelativesShowerAnswer}
                                    firstTitle={"Uma"}
                                    secondTitle={"Duas"}
                                    thirdTitle={"Três ou mais"} />
                            </View>
                            <ChangeClothesText />
                            <View style={{ height: 50, justifyContent: "center" }}>
                                <RadioButtonTripleResizableItem
                                    value={entity.relativesChangeClothesAnswer}
                                    onPressCheckbox={this.onChangeRelativesChangeClothesAnswer}
                                    firstTitle={"Uma"}
                                    secondTitle={"Duas"}
                                    thirdTitle={"Três ou mais"} />
                            </View>
                            <CleanPotText />
                            <View style={{ height: 50 }}>
                                <RadioButtonTripleResizableItem
                                    value={entity.relativesContainerCleanupAnswer}
                                    onPressCheckbox={this.onChangeRelativesContainerCleanupAnswer}
                                    firstTitle={"Uma"}
                                    secondTitle={"Duas"}
                                    thirdTitle={"Três ou mais"} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.2, width: "100%", paddingHorizontal: 20, justifyContent: "flex-end" }}>
                    <ContinueRequiredButton
                        onPress={() => { this.onContinueButtonClick() }}
                        disabled={this.disableButton()} />
                    {!entity.contaminated ?
                        (<DoubtButton onPress={() => { this.onDoubtPress() }} label="Responder depois" />)
                        : (<></>)}
                </View>
                <ProgressTracking amount={10} position={9} />
            </SafeAreaView>)
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };

    onDoubtPress = () => {
        let { entity } = this.state;
        entity.relativesShowerAnswer = null;
        entity.relativesChangeClothesAnswer = null;
        entity.relativesContainerCleanupAnswer = null;
        // entity.skippedAnswer = true;
        this.setState({ entity });
        this.props.navigation.navigate("FinishRemaining", { entity: entity });
    };
    onContinueButtonClick = () => {
        let { entity } = this.state;
        let nextRoute = "FinishComplete";
        if (entity.skippedAnswer)
            nextRoute = "FinishRemaining";
        this.props.navigation.navigate(nextRoute, { entity: entity });
    };
    disableButton = () => {
        let { entity } = this.state;
        return !(entity.relativesShowerAnswer && entity.relativesChangeClothesAnswer && entity.relativesContainerCleanupAnswer);
    };
    onChangeRelativesShowerAnswer = value => {
        let { entity } = this.state;
        entity.relativesShowerAnswer = value;
        this.setState({ entity });
    };
    onChangeRelativesChangeClothesAnswer = value => {
        let { entity } = this.state;
        entity.relativesChangeClothesAnswer = value;
        this.setState({ entity });
    };
    onChangeRelativesContainerCleanupAnswer = value => {
        let { entity } = this.state;
        entity.relativesContainerCleanupAnswer = value;
        this.setState({ entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Sobre <Text style={styles.boldText}>os cuidados</Text> que os demais</Text>
        <Text style={[styles.simpleText]}>moradores têm ao <Text style={styles.boldText}>entrar em casa:</Text></Text>
    </View>
);

const HomeEnterText = () => (
    <View style={[styles.textContainer, { marginTop: 20 }]}>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>Tomam banho ou lavam mãos e</Text>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>braços assim que entram em casa?</Text>
    </View>
);

const ChangeClothesText = () => (
    <View style={[styles.textContainer, { marginTop: 20 }]}>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>Trocam a roupa e guardam-nas</Text>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>em local separado?</Text>
    </View>
);

const CleanPotText = () => (
    <View style={[styles.textContainer, { marginTop: 20 }]}>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>Quando trazem vasilhames, limpam</Text>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>com água sanitária ou similar?</Text>
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
    },
    simpleText: {
        fontFamily: Colors.fontFamily,
        fontSize: 18
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