import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { Header } from 'react-native-elements';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { CheckboxItem, CheckboxItemWithPlus } from '../../../components/customcheckboxitem';
//CONTINUE
import { ContinueRequiredButton } from '../../../components/custombutton';
import { CustomSearch } from '../../../components/customsearch';

export default class ComorbiditiesPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            comorbiditiesSelected: [],
        },
        comorbiditiesList: [
            { identifier: "ndo", text: "Nenhuma das opções" },
            { identifier: "avc", text: "AVC prévio" },
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
        let { entity, comorbiditiesList } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <Header
                    containerStyle={{ marginHorizontal: 20 }}
                    backgroundColor={Colors.secondaryColor}
                    leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                    centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <ScrollView
                    nestedScrollEnabled={true}
                    style={{ width: "100%" }}>
                    <IntroText />
                    <View style={styles.checkboxItemContainer}>
                        {comorbiditiesList.map(comorbidity => {
                            return (
                                <CheckboxItem
                                    identifier={comorbidity.identifier}
                                    title={comorbidity.text}
                                    isChecked={this.isChecked}
                                    onClickCheck={comorbidity.identifier === "ndo" ? this.onClickNoneOfOptions : this.onClickCheck} />
                            );
                        })}
                    </View>
                    <View style={styles.buttonContainer}>
                        <ContinueRequiredButton disabled={this.disableButton()} onPress={() => { }} />
                    </View>
                    <ProgressTracking amount={7} position={5} />
                </ScrollView>
            </SafeAreaView >
        )
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    isChecked = (identifier) => {
        let { entity } = this.state;
        let currentComorbidityPosition = entity.comorbiditiesSelected.findIndex(selected => selected === identifier);
        return currentComorbidityPosition > -1;
    };
    onClickCheck = (identifier) => {
        let { entity } = this.state;

        let noneOfOptionsPosition = entity.comorbiditiesSelected.findIndex(selected => selected === "ndo");
        if (noneOfOptionsPosition > -1)
            entity.comorbiditiesSelected.splice(noneOfOptionsPosition, 1);

        let currentComorbidityPosition = entity.comorbiditiesSelected.findIndex(selected => selected === identifier);
        if (currentComorbidityPosition === -1) {
            entity.comorbiditiesSelected.push(identifier);
            this.setState({ entity });
            return;
        }
        entity.comorbiditiesSelected.splice(currentComorbidityPosition, 1);
        this.setState({ entity });
    };
    onClickNoneOfOptions = (identifier) => {
        let { entity } = this.state;
        entity.comorbiditiesSelected = [];
        entity.comorbiditiesSelected.push(identifier);
        this.setState({ entity });
    };
    disableButton = () => {
        let { entity } = this.state;
        return !(entity && entity.comorbiditiesSelected && entity.comorbiditiesSelected.length > 0);
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Você possui alguma(s)</Text>
        <Text style={[styles.simpleText]}>das <Text style={styles.boldText}>condições</Text> abaixo?</Text>
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
    checkboxItemContainer: {
        marginVertical: 20
    },
    buttonContainer: {
        marginHorizontal: 20
    }
});