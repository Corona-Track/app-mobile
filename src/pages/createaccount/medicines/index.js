import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { Header } from 'react-native-elements';

import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { CheckboxItem, CheckboxItemWithExpand } from '../../../components/customcheckboxitem';
//CONTINUE
import { ContinueRequiredButton } from '../../../components/custombutton';

export default class MedicinesPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            medicinesSelected: [],
        },
        medicinesList: [
            { identifier: "Nenhuma das opções" },
            { identifier: "Anti-inflamatório" },
            { identifier: "Analgésico" },
            { identifier: "Corticóide" },
        ],
        expandedMedicines: []
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
        let { entity, medicinesList } = this.state;
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
                        {medicinesList.map(medicine => {
                            return (
                                medicine.identifier === "Nenhuma das opções" ? (<CheckboxItem
                                    identifier={medicine.identifier}
                                    isChecked={this.isChecked}
                                    onClickCheck={this.onClickNoneOfOptions} />)
                                    : this.renderCheckboxExpand(medicine));
                        })}
                    </View>
                    <View style={styles.buttonContainer}>
                        <ContinueRequiredButton disabled={this.disableButton()} onPress={() => { }} />
                    </View>
                    <ProgressTracking amount={7} position={6} />
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
        let currentMedicinePosition = entity.medicinesSelected.findIndex(selected => selected === identifier);
        return currentMedicinePosition > -1;
    };
    onClickCheck = (identifier) => {
        let { entity } = this.state;

        let noneOfOptionsPosition = entity.medicinesSelected.findIndex(selected => selected === "Nenhuma das opções");
        if (noneOfOptionsPosition > -1)
            entity.medicinesSelected.splice(noneOfOptionsPosition, 1);

        let currentMedicinePosition = entity.medicinesSelected.findIndex(selected => selected === identifier);
        if (currentMedicinePosition === -1) {
            entity.medicinesSelected.push(identifier);
            this.setState({ entity });
            return;
        }
        entity.medicinesSelected.splice(currentMedicinePosition, 1);
        this.setState({ entity });
    };
    onClickNoneOfOptions = (identifier) => {
        let { entity } = this.state;
        let noneOfOptionsPosition = entity.medicinesSelected.findIndex(selected => selected === "Nenhuma das opções");
        if (noneOfOptionsPosition > -1) {
            entity.medicinesSelected.splice(noneOfOptionsPosition, 1);
            this.setState({ entity });
            return;
        }
        entity.medicinesSelected = [];
        entity.medicinesSelected.push(identifier);
        this.setState({ entity });
    };
    disableButton = () => {
        let { entity } = this.state;
        return !(entity && entity.medicinesSelected && entity.medicinesSelected.length > 0);
    };
    renderCheckboxExpand = medicine => {
        if (!medicine)
            return (<></>);
        let isExpanded = this.isExpanded(medicine.identifier);
        return (
            <>
                <CheckboxItemWithExpand
                    identifier={medicine.identifier}
                    isChecked={this.isChecked}
                    onClickCheck={this.onClickCheck}
                    onPressExpand={this.onPressExpand}
                    isExpanded={isExpanded} />
                {/* <View style={{ height: 500, backgroundColor: "gray" }}>

                </View> */}

            </>
        )
    };
    onPressExpand = medicine => {
        let { expandedMedicines } = this.state;
        let currentExpandedPosition = expandedMedicines.findIndex(expanded => expanded === medicine);
        if (currentExpandedPosition === -1) {
            expandedMedicines.push(medicine);
            this.setState({ expandedMedicines: expandedMedicines });
            return;
        }
        expandedMedicines.splice(currentExpandedPosition, 1);
        this.setState({ expandedMedicines: expandedMedicines });
    };
    isExpanded = medicine => {
        let { expandedMedicines } = this.state;
        let currentExpandedPosition = expandedMedicines.findIndex(expanded => expanded === medicine);
        return currentExpandedPosition > -1;
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Você toma algum(ns) dos</Text>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>medicamentos</Text> abaixo?</Text>
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