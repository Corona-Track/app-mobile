import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { RadioButtonItem } from '../../../components/customcheckboxitem';

export default class OutsideWorkPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            outsideWorkAnswer: null
        },
        outsideWorkList: [
            { identifier: "Em um ambiente fechado com mais pessoas, como clínica, escritório, loja ou motorista de aplicativo" },
            { identifier: "Em galpões com pé direito duplo com poucas pessoas" },
            { identifier: "Ao ar livre" }
        ]
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
        let { entity, outsideWorkList } = this.state;
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
                    <ScrollView>
                        <IntroText />
                        <View style={styles.radioButtonItemContainer}>
                            {outsideWorkList.map(work => {
                                let customHeight = 40;
                                if (work.identifier === "Em um ambiente fechado com mais pessoas, como clínica, escritório, loja ou motorista de aplicativo")
                                    customHeight = 70;
                                return (
                                    <View style={{ height: customHeight, marginTop: 15, paddingHorizontal: 10 }}>
                                        <RadioButtonItem
                                            identifier={work.identifier}
                                            isChecked={this.isChecked}
                                            onClickCheck={this.onClickRadio} />
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.25, width: "100%", paddingHorizontal: 20, justifyContent: "flex-end" }}>
                    <ContinueRequiredButton
                        onPress={() => { this.onContinueButtonClick() }}
                        disabled={this.disableButton()} />
                    {!entity.contaminated ?
                        (<DoubtButton onPress={() => { this.onDoubtPress() }} label="Responder depois" />)
                        : (<></>)}
                </View>
                <ProgressTracking amount={10} position={8} />
            </SafeAreaView>
        )
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    onContinueButtonClick = () => {
        let { entity } = this.state;
        this.props.navigation.navigate("RelativesLeavingHome", { entity: entity });
    };

    disableButton = () => {
        let { entity } = this.state;
        return !(entity.outsideWorkAnswer);
    };
    onClickRadio = identifier => {
        let { entity } = this.state;
        entity.outsideWorkAnswer = identifier;
        this.setState({ entity });
    };
    onDoubtPress = () => {
        let { entity } = this.state;
        entity.outsideWorkAnswer = null;
        entity.skippedAnswer = true;
        this.setState({ entity });
        this.props.navigation.navigate("RelativesLeavingHome", { entity: entity });
    };
    isChecked = (identifier) => {
        let { entity } = this.state;
        return entity.outsideWorkAnswer === identifier;
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>Trabalho fora de casa</Text></Text>
        <Text style={[styles.simpleText]}>durante a pandemia:</Text>
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