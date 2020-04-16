import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { ContinueRequiredButton, DoubtButton } from '../../../components/custombutton';
import { RadioButtonTripleResizableItem } from '../../../components/customcheckboxitem';

export default class HomePrecautionsPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            showerAnswer: null,
            changeClothesAnswer: null,
            containerCleanupAnswer: null
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
                            <ShowerText />
                            <View style={{ height: 50 }}>
                                <RadioButtonTripleResizableItem
                                    value={entity.showerAnswer}
                                    onPressCheckbox={this.onChangeShowerAnswer}
                                    firstTitle={"Sempre"}
                                    secondTitle={"Às vezes"}
                                    thirdTitle={"Nunca"} />
                            </View>
                            <ChangeClothesText />
                            <View style={{ height: 50 }}>
                                <RadioButtonTripleResizableItem
                                    value={entity.changeClothesAnswer}
                                    onPressCheckbox={this.onChangeClothesAnswer}
                                    firstTitle={"Sempre"}
                                    secondTitle={"Às vezes"}
                                    thirdTitle={"Nunca"} />
                            </View>
                            <ContainerCleanupText />
                            <View style={{ height: 50 }}>
                                <RadioButtonTripleResizableItem
                                    value={entity.containerCleanupAnswer}
                                    onPressCheckbox={this.onChangeCleanupAnswer}
                                    firstTitle={"Sempre"}
                                    secondTitle={"Às vezes"}
                                    thirdTitle={"Nunca"} />
                            </View>
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
                <ProgressTracking amount={10} position={7} />
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
        this.props.navigation.navigate("OutsideWork", { entity: entity });
    };
    disableButton = () => {
        let { entity } = this.state;
        return !(entity.showerAnswer && entity.changeClothesAnswer && entity.containerCleanupAnswer);
    };
    onDoubtPress = () => {
        let { entity } = this.state;
        entity.showerAnswer = null;
        entity.changeClothesAnswer = null;
        entity.containerCleanupAnswer = null;
        entity.skippedAnswer = true;
        this.setState({ entity });
        this.props.navigation.navigate("OutsideWork", { entity: entity });
    };
    onChangeShowerAnswer = value => {
        let { entity } = this.state;
        entity.showerAnswer = value;
        this.setState({ entity });
    };
    onChangeClothesAnswer = value => {
        let { entity } = this.state;
        entity.changeClothesAnswer = value;
        this.setState({ entity });
    };
    onChangeCleanupAnswer = value => {
        let { entity } = this.state;
        entity.containerCleanupAnswer = value;
        this.setState({ entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>Cuidados ao entrar em casa</Text></Text>
        <Text style={[styles.simpleText]}>para proteger outros moradores</Text>
    </View>
);

const ShowerText = () => (
    <View style={[styles.textContainer, { marginTop: 20 }]}>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>Tomo banho ou lavo mãos e</Text>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>branços assim que entro em casa</Text>
    </View>
);

const ChangeClothesText = () => (
    <View style={[styles.textContainer, { marginTop: 20 }]}>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>Troco a roupa e guardo-as</Text>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>em local separado</Text>
    </View>
);

const ContainerCleanupText = () => (
    <View style={[styles.textContainer, { marginTop: 20 }]}>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>Quando trago vasilhames, limpo-os</Text>
        <Text style={[styles.simpleText, { fontSize: 15, color: Colors.placeholderTextColor }]}>com água sanitária ousimilar</Text>
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
        fontSize: 20
    },
    boldText: {
        fontWeight: "bold"
    },
    radioButtonItemContainer: {
        width: "100%",
    }
});