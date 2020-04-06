import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Paragraph, Menu, Divider, Provider, } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from '../../themes/variables';

export const CustomDropDown = ({
    label,
    isVisible,
    onCloseMenu,
    value,
    onPress,
    options,
    onSelectOption }) => {
    return (
        <Provider>
            <View
                style={styles.menuContainer}>
                <Menu
                    contentStyle={{ width: "100%" }}
                    visible={isVisible}
                    onDismiss={onCloseMenu}
                    anchor={
                        <TouchableOpacity onPress={onPress}>
                            <TextInput
                                label={label}
                                editable={false}
                                style={styles.input}
                                value={value.title}
                                theme={{ colors: { primary: Colors.inputPrimaryColor, placeholder: Colors.placeholderTextColor } }}
                                maxLength={40}
                                mode="outlined" />
                            <Icon
                                style={styles.iconMore}
                                name={isVisible ? "expand-less" : "expand-more"}
                                size={32}
                                color={Colors.buttonPrimaryColor} />
                        </TouchableOpacity>
                    }>
                    {options.map(item => (
                        <Menu.Item style={styles.option} onPress={() => { onSelectOption(item) }} title={item.title} />
                    ))}
                </Menu>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        marginTop: 15,
        minWidth: "100%"
    },
    option: {
        fontFamily: Colors.fontFamily
    },
    iconMore: {
        flex: 0,
        position: "absolute",
        bottom: 10,
        right: 15
    }
});
