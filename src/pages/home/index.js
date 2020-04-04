import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Colors } from '../../themes/variables';

export default class HomePage extends Component {
    static navigationOptions = {
        headerShown: false
    };
    state = {
    };
    componentDidMount() {
    };
    render = () => {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Home</Text>
            </SafeAreaView>)
    };
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.secondaryColor,
        height: "100%",
        marginHorizontal: 20
    },
    logo: {
        height: 150,
        width: 210,
    }
});