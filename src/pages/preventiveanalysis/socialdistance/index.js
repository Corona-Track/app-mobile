import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { RadioButtonItem, SubCheckboxItem } from '../../../components/customcheckboxitem';

export default class SocialDistancePage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            keepDistance: null,
            reasonToNotKeepDistanceSelected: []
        },
        reasonsList: [
            { identifier: "Mantenho sempre 2 mestros de distância de outras pessoas" },
            { identifier: "Nem sempre mantenho distância porque:" },
        ],
        reasonsToNotKeepDistanceList: [
            { identifier: "Esqueço" },
            { identifier: "Por causa do meu trabalho" },
            { identifier: "Por causa do transporte público (trens e ônibus)" },
        ],
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
        let { entity, reasonsList, reasonsToNotKeepDistanceList } = this.state;
        return (<SafeAreaView style={styles.container}>
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
                        {reasonsList.map(reason => {
                            return (
                                <View style={{ height: 70, paddingHorizontal: 20 }}>
                                    <RadioButtonItem
                                        identifier={reason.identifier}
                                        isChecked={this.isCheckedRadio}
                                        onClickCheck={this.onClickRadio} />
                                </View>
                            );
                        })}
                    </View>
                    {entity && entity.keepDistance && entity.keepDistance === "Nem sempre mantenho distância porque:" && <View style={styles.radioButtonItemContainer}>
                        {reasonsToNotKeepDistanceList.map(reason => {
                            return (
                                <View style={{ height: 40, marginHorizontal: 50 }}>
                                    <SubCheckboxItem
                                        identifier={reason.identifier}
                                        isChecked={this.isChecked}
                                        onClickCheck={this.onClickCheck} />
                                </View>
                            );
                        })}
                    </View>}
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
            <ProgressTracking amount={10} position={4} />
        </SafeAreaView>)
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    onContinueButtonClick = () => {
        let { entity } = this.state;
        this.props.navigation.navigate("ProtectionUsage", { entity: entity });
    };
    disableButton = () => {
        let { entity } = this.state;
        return !(entity.keepDistance);
    };
    isCheckedRadio = identifier => {
        let { entity } = this.state;
        return entity.keepDistance && entity.keepDistance === identifier;
    };
    onClickRadio = identifier => {
        let { entity } = this.state;
        entity.keepDistance = identifier;
        entity.reasonToNotKeepDistanceSelected = [];
        this.setState({ entity });
    };
    onDoubtPress = () => {
        let { entity } = this.state;
        entity.reasonToNotKeepDistanceSelected = [];
        entity.keepDistance = null;
        this.setState({ entity });
        this.props.navigation.navigate("ProtectionUsage", { entity: entity });
    };
    isChecked = (identifier) => {
        let { entity } = this.state;
        let currentPosition = entity.reasonToNotKeepDistanceSelected.findIndex(selected => selected === identifier);
        return currentPosition > -1;
    };
    onClickCheck = (identifier) => {
        let { entity } = this.state;
        let currentPosition = entity.reasonToNotKeepDistanceSelected.findIndex(selected => selected === identifier);
        if (currentPosition === -1) {
            entity.reasonToNotKeepDistanceSelected.push(identifier);
            this.setState({ entity });
            return;
        }
        entity.reasonToNotKeepDistanceSelected.splice(currentPosition, 1);
        this.setState({ entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Sobre o <Text style={styles.boldText}>distanciamento</Text></Text>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>social. </Text>Ao sair de casa:</Text>
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

    },
});