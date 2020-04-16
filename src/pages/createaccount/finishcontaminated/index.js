import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { NavigationEvents, StackActions, NavigationActions } from 'react-navigation';

import { Colors } from '../../../themes/variables';
import { ContaminatedAnswerNowButton, ContaminatedAnswerLaterButton } from '../../../components/custombutton';
import { getFirstName } from '../../../services/formvalidatorservice';

export default class FinishContaminatedPage extends Component {
    static navigationOptions = {
        headerShown: false,
        gestureEnabled: false,
    };
    static propTypes = {
        entity: PropTypes.object,
    }
    state = {
        entity: {},
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
                <CloseButton onPress={() => { }} />
                <View style={{ flex: 0.75, justifyContent: "center", flexDirection: "column", width: "100%", paddingTop: 60 }}>
                    {entity.photo ? (<View style={styles.avatarContainer}>
                        <Avatar
                            size={125}
                            rounded
                            overlayContainerStyle={styles.avatarContainerIcon}
                            source={{ uri: entity.photo }} />
                    </View>) : (<></>)}
                    < IntroText userName={entity.name} />
                </View>
                <View style={{ flex: 0.25, width: "100%" }}>
                    <ContaminatedAnswerNowButton onPress={() => { this.onAnswerNowButtonPress() }} />
                    <ContaminatedAnswerLaterButton onPress={() => { }} />
                </View>
            </SafeAreaView >
        )
    };
    onLeftButtonPress = () => {
        this.props.navigation.pop();
    };
    onAnswerNowButtonPress = () => {
        let { entity } = this.state;
        let entityToPass = {
            name: entity.name,
            photo: entity.photo,
            contaminated: entity.contaminated
        };
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'Medicines',
                params: {
                    entity: entityToPass
                },
            })]
        });
        this.props.navigation.dispatch(resetAction);
    };
};

const IntroText = ({ userName }) => {
    return (<View style={styles.textContainer}>
        <Text style={[styles.simpleText, { marginVertical: 20 }]}><Text style={[styles.boldText, { fontSize: 28 }]}>Excelente, {getFirstName(userName)}</Text></Text>
        <Text style={[styles.simpleText]}>É muito importante sabermos,</Text>
        <Text style={[styles.simpleText]}>também, como foram seus hábitos</Text>
        <Text style={[styles.simpleText]}>durante a pandemia do Coronavírus</Text>
        <Text style={[styles.simpleText]}>antes de ter contraído a doença.</Text>
        <Text style={[styles.simpleText]}>Por isso temos algumas</Text>
        <Text style={[styles.simpleText]}>perguntas, você se importaria em</Text>
        <Text style={[styles.simpleText]}>responder? Você ajudará outras</Text>
        <Text style={[styles.simpleText]}>pessoas a não contrairem a doença.</Text>
    </View>)
};

const CloseButton = ({ onPress }) => {
    return (<TouchableOpacity style={styles.rightComponent} onPress={onPress} >
        <Icon name="close" size={32} color={Colors.secondaryColor} />
    </TouchableOpacity>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.contaminatedColor,
        height: "100%",
        paddingHorizontal: 20,
        paddingBottom: 15
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    simpleText: {
        fontFamily: Colors.fontFamily,
        fontSize: 18,
        color: Colors.secondaryColor
    },
    boldText: {
        fontWeight: "bold"
    },
    avatarContainer: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
        marginVertical: 20
    },
    rightComponent: {
        flex: 0,
        position: "absolute",
        right: 30,
        top: 35
    },
    avatarContainerIcon: {
        backgroundColor: Colors.secondaryColor,
        borderColor: Colors.secondaryColor,
        borderWidth: 3,
    },
});