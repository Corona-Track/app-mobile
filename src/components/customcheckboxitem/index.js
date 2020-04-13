import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes/variables';
import { CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const CheckboxItem = ({ identifier, isChecked, onClickCheck, title }) => {
    let checked = isChecked(identifier);
    return (<View key={identifier} style={styles.checkboxContainer}>
        <View style={styles.firstColumn}>
            <CheckBox
                checkedColor={Colors.navigatorIconColor}
                containerStyle={styles.checkbox}
                checked={checked}
                onPress={() => { onClickCheck(identifier) }} />
        </View>
        <View><Text style={styles.checkboxText}>{title}</Text></View>
    </View>)
};

export const CheckboxItemWithPlus = ({
    identifier,
    isChecked,
    onClickCheck,
    title,
    onPressPlus }) => {
    let checked = isChecked(identifier);
    return (<View style={styles.checkboxWithPlusContainer}>
        <View style={styles.firstColumn}>
            <CheckBox
                checkedColor={Colors.navigatorIconColor}
                containerStyle={styles.checkbox}
                checked={checked}
                onPress={() => { onClickCheck(identifier) }} />
        </View>
        <View style={styles.secondColumn}>
            <Text style={styles.checkboxText}>{title}</Text>
            <PlusIcon onPressPlus={onPressPlus} />
        </View>
    </View>)
};

const PlusIcon = ({ onPressPlus }) => {
    return (<TouchableOpacity onPress={onPressPlus}>
        <Icon
            name="plus"
            size={25}
            color={Colors.navigatorIconColor} />
    </TouchableOpacity>);
};


const styles = StyleSheet.create({
    checkboxContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
        fontFamily: Colors.fontFamily,
        marginHorizontal: 20
    },
    checkbox: {
        padding: 0,
        margin: 0,
    },
    checkboxText: {
        fontFamily: Colors.fontFamily,
        fontWeight: "normal",
    },
    firstColumn: {
        width: 40
    },
    secondColumn: {
        width: "88%",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    checkboxWithPlusContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
        fontFamily: Colors.fontFamily,
        paddingHorizontal: 20
    },
});