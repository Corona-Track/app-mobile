import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Header, CheckBox } from 'react-native-elements';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import { CheckboxItem } from '../../../components/customcheckboxitem';

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
            { identifier: "infarto", text: "Infarto prévio" },
            { identifier: "fumante", text: "Fumante" },
            { identifier: "insuficienciarenal", text: "Insuficiência renal" },
            { identifier: "obesidade", text: "Obesidade" },
            { identifier: "colesterol", text: "Colesterol alto" },
            { identifier: "diabetes", text: "Diabetes" },
            { identifier: "asma", text: "Asma" },
            { identifier: "cancer", text: "Câncer" },
            { identifier: "renalcronica", text: "Doença renal crônica" },
            { identifier: "hipertensao", text: "Hipertensão" },
            { identifier: "others", text: "Outros" },
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
        let { entity } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
                <Header
                    backgroundColor={Colors.secondaryColor}
                    leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                    centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
                    rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
                />
                <ScrollView style={{ width: "100%" }}>
                    <IntroText />
                    <View style={styles.checkboxItemContainer}>
                        <CheckboxItem
                            identifier={"ndo"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickNoneOfOptions}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"avc"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"infarto"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"fumante"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"insuficienciarenal"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"obesidade"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"colesterol"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"diabetes"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"asma"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"cancer"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"renalcronica"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"hipertensao"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
                        <CheckboxItem
                            identifier={"others"}
                            isChecked={this.isChecked}
                            onClickCheck={this.onClickCheck}
                            getTextFromIdentifier={this.getTextFromIdentifier} />
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
    getTextFromIdentifier = (identifier) => {
        let { comorbiditiesList } = this.state;
        let currentComorbidity = comorbiditiesList.filter(comorbidity => {
            return comorbidity.identifier === identifier
        });
        if (!currentComorbidity)
            return "-";
        currentComorbidity = currentComorbidity[0];
        return currentComorbidity.text;
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
        marginHorizontal: 20,
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
        marginTop: 20
    }
});