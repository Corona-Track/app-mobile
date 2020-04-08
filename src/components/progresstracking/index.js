import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';

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
            circles.push(<View style={[styles.circle, { backgroundColor: position === i ? "#EA5B2D" : "#F9CEC0" }]} key={i} />)
        return circles;
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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