import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { RadioButtonItem, CheckboxItem } from '../../../components/customcheckboxitem';

export default class TouchingPrecautionPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            touchingPrecaution: null
        },
        contaminationList: [
            { identifier: "Uso luva ou papel descartável para não contaminar as mãos" },
            { identifier: "Contamino as mãos e limpo em seguida com álcool gel" },
            { identifier: "Contamino as mãos e fico inquieto enquanto não as lavo" },
            { identifier: "Contamino as mãos e limpo quando posso" },
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
        let { entity, contaminationList } = this.state;
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
                            {contaminationList.map(situation => {
                                return (
                                    <View style={{ height: 70 }}>
                                        <RadioButtonItem
                                            identifier={situation.identifier}
                                            isChecked={this.isChecked}
                                            onClickCheck={this.onClickRadio} />
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.2, width: "100%", paddingHorizontal: 20, justifyContent: "flex-end", paddingBottom: 20 }}>
                    <ContinueRequiredButton
                        onPress={() => { this.onContinueButtonClick() }}
                        disabled={this.disableButton()} />
                    {!entity.contaminated ?
                        (<DoubtButton onPress={() => { this.onDoubtPress() }} label="Responder depois" />)
                        : (<></>)}
                </View>
                <ProgressTracking amount={10} position={6} />
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
        this.props.navigation.navigate("HomePrecautions", { entity: entity });
    };

    disableButton = () => {
        let { entity } = this.state;
        return !(entity.touchingPrecaution && entity.touchingPrecaution.length > 0);
    };
    onClickRadio = identifier => {
        let { entity } = this.state;
        entity.touchingPrecaution = identifier;
        this.setState({ entity });
    };
    onDoubtPress = () => {
        let { entity } = this.state;
        entity.touchingPrecaution = null;
        entity.skippedAnswer = true;
        this.setState({ entity });
        this.props.navigation.navigate("HomePrecautions", { entity: entity });
    };
    isChecked = (identifier) => {
        let { entity } = this.state;
        return entity.touchingPrecaution === identifier;
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
    },
    radioButtonItemContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
});