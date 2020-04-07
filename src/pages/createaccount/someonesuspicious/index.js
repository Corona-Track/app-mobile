import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Colors } from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import PropTypes from 'prop-types';
import { ConfirmButton, DenyButton, DoubtButton } from '../../../components/custombutton';
import { NavigationEvents } from 'react-navigation';
import { ImageIcon } from '../../../components/customimageicon';
export default class SomeoneSuspiciousPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {
            someoneSuspicious: "",
        },
    };
    initialize(props) {
        if (!props)
            return;
        let { navigation } = props;
        let { entity } = this.state;
        previousEntity = navigation.getParam('entity', null);
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
                <View style={{ flex: 0.60, justifyContent: "center" }}>
                    <IntroText />
                    <View style={styles.avatarContainer}>
                        <ImageIcon source={require('../../../assets/images/sweat.png')} />
                    </View>
                </View>
                <View style={{ flex: 0.40, width: "100%" }}>
                    <DenyButton onPress={() => { this.onAnswerButtonPress("deny") }} />
                    <ConfirmButton onPress={() => { this.onAnswerButtonPress("confirm") }} />
                    <DoubtButton onPress={() => { this.onAnswerButtonPress("doubt") }} label="Não tenho certeza" />
                    <ProgressTracking amount={7} position={4} />
                </View>
            </SafeAreaView >
        )
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onRightButtonPress = () => {
        this.props.navigation.pop();
    };
    onAnswerButtonPress = answer => {
        let { entity } = this.state;
        entity.someoneSuspicious = answer;
        this.props.navigation.navigate("SomeoneDiagnosed", { entity: entity });
    };
};

const IntroText = () => (
    <View style={styles.textContainer}>
        <Text style={[styles.simpleText]}>Você teve contato com</Text>
        <Text style={[styles.simpleText]}><Text style={styles.boldText}>alguém suspeito</Text> de estar com</Text>
        <Text style={[styles.simpleText]}>Coronavírus nos últimos 14 dias?</Text>
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
    avatarContainer: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: "center",
    },
});