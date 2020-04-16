import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { RadioButtonItem, CheckboxItem } from '../../../components/customcheckboxitem';

export default class ProtectionUsagePage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            protectionAnswer: [],
        },
        situationsList: [
            { identifier: "Uso sempre proteção de rosto (garrafa PET ou algo parecido)" },
            { identifier: "Uso sempre máscara (cirúrgica ou caseira):" },
        ],
        negativeSituationsList: [
            { identifier: "Não constumo usar nenhum tipo de proteção ao sair de casa" },
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
        let { entity, situationsList, negativeSituationsList } = this.state;
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
                    <View style={styles.radioButtonItemContainer}>
                        {situationsList.map(situation => {
                            return (
                                <View style={{ height: 40, marginVertical: 10, paddingHorizontal: 20 }}>
                                    <CheckboxItem
                                        identifier={situation.identifier}
                                        isChecked={this.isChecked}
                                        onClickCheck={this.onClickCheck} />
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.radioButtonItemContainer}>
                        {negativeSituationsList.map(situation => {
                            return (
                                <View style={{ height: 70, marginVertical: 10, paddingHorizontal: 10 }}>
                                    <RadioButtonItem
                                        identifier={situation.identifier}
                                        isChecked={this.isChecked}
                                        onClickCheck={this.onClickRadio} />
                                </View>
                            );
                        })}
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
                <ProgressTracking amount={10} position={5} />
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
        this.props.navigation.navigate("TouchingPrecaution", { entity: entity });
    };

    disableButton = () => {
        let { entity } = this.state;
        return !(entity.protectionAnswer && entity.protectionAnswer.length > 0);
    };
    onClickRadio = identifier => {
        let { entity } = this.state;
        entity.protectionAnswer = [];
        entity.protectionAnswer.push(identifier);
        this.setState({ entity });
    };
    onDoubtPress = () => {
        let { entity } = this.state;
        entity.protectionAnswer = [];
        this.setState({ entity });
        this.props.navigation.navigate("TouchingPrecaution", { entity: entity });
    };
    isChecked = (identifier) => {
        let { entity } = this.state;
        let currentPosition = entity.protectionAnswer.findIndex(selected => selected === identifier);
        return currentPosition > -1;
    };
    onClickCheck = (identifier) => {
        let { entity } = this.state;
        let currentPositionRadio = entity.protectionAnswer.findIndex(selected => selected === "Não constumo usar nenhum tipo de proteção ao sair de casa");
        if (currentPositionRadio > -1) {
            entity.protectionAnswer.splice(currentPositionRadio, 1);
        }

        let currentPosition = entity.protectionAnswer.findIndex(selected => selected === identifier);
        if (currentPosition === -1) {
            entity.protectionAnswer.push(identifier);
            this.setState({ entity });
            return;
        }
        entity.protectionAnswer.splice(currentPosition, 1);
        this.setState({ entity });
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
    radioButtonItemContainer: {
    },
});