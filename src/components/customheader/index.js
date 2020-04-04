import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes/variables';

export const LeftComponent = ({ onPress }) => {
    return (<TouchableOpacity style={{ width: 50, alignItems: "flex-start" }} onPress={onPress}>
        <Icon name="arrow-left" size={32} color={Colors.navigatorIconColor} />
    </TouchableOpacity>)
};

export const RightComponent = ({ onPress }) => {
    return (<TouchableOpacity style={{ width: 50, alignItems: "flex-end" }} onPress={onPress} >
        <Icon name="close" size={32} color={Colors.navigatorIconColor} />
    </TouchableOpacity>)
};