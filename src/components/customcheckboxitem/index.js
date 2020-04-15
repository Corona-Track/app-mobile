import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes/variables';
import { CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const CheckboxItem = ({ identifier, isChecked, onClickCheck }) => {
    let checked = isChecked(identifier);
    return (<View key={identifier} style={styles.checkboxContainer}>
        <View style={styles.firstColumn}>
            <CheckBox
                checkedColor={Colors.navigatorIconColor}
                containerStyle={styles.checkbox}
                checked={checked}
                onPress={() => { onClickCheck(identifier) }} />
        </View>
        <View><Text style={styles.checkboxText}>{identifier}</Text></View>
    </View>)
};

export const CheckboxItemWithPlus = ({
    identifier,
    isChecked,
    onClickCheck,
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
            <Text style={styles.checkboxText}>{identifier}</Text>
            <PlusIcon onPressPlus={onPressPlus} />
        </View>
    </View>)
};

export const CheckboxItemWithExpand = ({
    identifier,
    isChecked,
    onClickCheck,
    onPressExpand,
    isExpanded }) => {
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
            <Text style={styles.checkboxText}>{identifier}</Text>
            <ExpandIcon onPress={() => { onPressExpand(identifier) }} isExpanded={isExpanded} />
        </View>
    </View>)
};

export const RadioButtonYesOrNoItem = ({ value, onPressCheckbox, yesTitle, noTitle }) => {
    return (<View style={styles.checkboxContainer}>
        <CheckBox
            containerStyle={styles.radioButtonContainer}
            textStyle={styles.radioButtonText}
            center
            title={yesTitle ?? 'SIM'}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor={Colors.navigatorIconColor}
            checked={value === true}
            onPress={() => onPressCheckbox(true)}
        />
        <CheckBox
            containerStyle={styles.radioButtonContainer}
            textStyle={styles.radioButtonText}
            center
            title={noTitle ?? 'NÃO'}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor={Colors.navigatorIconColor}
            checked={value === false}
            onPress={() => onPressCheckbox(false)}
        />
    </View>)
};

export const RadioButtonItem = ({ identifier, isChecked, onClickCheck }) => {
    let checked = isChecked(identifier);
    return (<View key={identifier} style={styles.radioButtonBox}>
        <CheckBox
            containerStyle={styles.radioButtonContainer}
            textStyle={styles.radioButtonText}
            title={identifier}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor={Colors.navigatorIconColor}
            checked={checked}
            onPress={() =>
                onClickCheck(identifier)} />
    </View>)
};

export const SubCheckboxItem = ({ identifier, isChecked, onClickCheck }) => {
    let checked = isChecked(identifier);
    return (<View key={identifier} style={styles.subCheckboxContainer}>
        <View style={styles.firstColumn}>
            <CheckBox
                checkedColor={Colors.navigatorIconColor}
                containerStyle={styles.checkbox}
                checked={checked}
                onPress={() => { onClickCheck(identifier) }} />
        </View>
        <View><Text style={styles.checkboxText}>{identifier}</Text></View>
    </View>)
};

const ExpandIcon = ({ onPress, isExpanded }) => {
    return (<TouchableOpacity onPress={onPress}>
        <Icon
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={30}
            color={Colors.navigatorIconColor} />
    </TouchableOpacity>);
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
    radioButtonContainer: {
        backgroundColor: "transparent",
        borderWidth: 0,
        height: "100%",
    },
    radioButtonText: {
        fontWeight: "normal",
        fontFamily: Colors.fontFamily,
        fontSize: 16
    },
    radioButtonBox: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        fontFamily: Colors.fontFamily,
        height: "100%",
    },
    subCheckboxContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
        fontFamily: Colors.fontFamily,
    },
});