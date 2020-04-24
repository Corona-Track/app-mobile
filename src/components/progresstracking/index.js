import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';
import { Colors } from '../../themes/variables';

export default class ProgressTracking extends Component {
    static propTypes = {
        position: PropTypes.number,
        amount: PropTypes.number
    }
    render = () => {
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                    {this.renderAmount()}
                </View>
            </View>);
    };
    renderAmount = () => {
        let { amount, position } = this.props;
        var circles = [];
        for (let i = 1; i <= amount; i++)
            circles.push(<View style={[styles.circle, { backgroundColor: position === i ? Colors.blue : "rgba(0, 88, 244, 0.3);" }]} key={i} />)
        return circles;
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        position: "absolute",
        bottom: 20,
        left: 0,
        width: "100%",
        alignItems: "center",
        paddingTop: 10,
        backgroundColor: Colors.secondaryColor
    },
    background: {
        flexDirection: "row",
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 20,
        marginRight: 4,
        overflow: "hidden",
    },
});