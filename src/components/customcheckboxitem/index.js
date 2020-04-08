import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../themes/variables';
import { CheckBox } from 'react-native-elements';

export const CheckboxItem = ({ identifier, isChecked, onClickCheck, getTextFromIdentifier }) => {
    let checked = isChecked(identifier);
    return (<View style={styles.checkboxContainer}>
        <View style={styles.firstColumn}>
            <CheckBox
                checkedColor={Colors.navigatorIconColor}
                containerStyle={styles.checkbox}
                checked={checked}
                onPress={() => {
                    onClickCheck(identifier)
                }}
            />
        </View>
        <View>
            <Text style={styles.checkboxText}>{getTextFromIdentifier(identifier)}</Text>
        </View>
    </View>)
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
        fontFamily: Colors.fontFamily
    },
    checkbox: {
        padding: 0,
        margin: 0,
    },
    checkboxText: {
        fontFamily: Colors.fontFamily,
        fontWeight: "normal"
    },
    firstColumn: {
        width: 40
    },
});