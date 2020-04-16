import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colors } from '../../themes/variables';
import { Avatar } from 'react-native-elements';

export const LeftComponent = ({ onPress }) => {
    return (<TouchableOpacity style={styles.leftComponent} onPress={onPress}>
        <Icon name="arrow-left" size={32} color={Colors.navigatorIconColor} />
    </TouchableOpacity>)
};

export const RightComponent = ({ onPress }) => {
    return (<TouchableOpacity style={styles.rightComponent} onPress={onPress} >
        <Icon name="close" size={32} color={Colors.navigatorIconColor} />
    </TouchableOpacity>)
};

export const CenterComponent = ({ photo, userName }) => {
    return (<View style={styles.centerComponent} >
        {photo ? (<Avatar
            size={45}
            rounded
            overlayContainerStyle={styles.avatarContainerIcon}
            source={{ uri: photo }} />) : (<></>)}
        {userName ? (<Text numberOfLines={1} style={styles.userName}>{userName}</Text>) : (<></>)}
    </View>)
};

const styles = StyleSheet.create({
    leftComponent: {
        width: 50, alignItems: "flex-start"
    },
    rightComponent: {
        width: 50, alignItems: "flex-end"
    },
    centerComponent: {
        flexDirection: "row",
    },
    avatarContainerIcon: {
        width: 45,
        height: 45,
    },
    userName: {
        textAlign: "center",
        width: 150,
        textAlignVertical: "center",
        fontFamily: Colors.fontFamily,
        color: Colors.navigatorIconColor,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginLeft: 5
    }
});