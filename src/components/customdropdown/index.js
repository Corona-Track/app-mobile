import * as React from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { Colors } from '../../themes/variables';
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from 'prop-types';

export class CustomDropDown extends React.Component {
    static propTypes = {
        list: PropTypes.array,
        onChangeSelected: PropTypes.func,
        title: PropTypes.string,
        getLabel: PropTypes.func,
        value: PropTypes.any
    };
    render() {
        let {
            list,
            getLabel,
            title,
            onChangeSelected,
            value } = this.props;
        return (
            <CustomPicker
                modalStyle={{ borderRadius: 10 }}
                options={list}
                getLabel={getLabel}
                fieldTemplate={settings => this.renderField(settings, title)}
                optionTemplate={this.renderOption}
                headerTemplate={() => this.renderHeader(title)}
                footerTemplate={this.renderFooter}
                onValueChange={onChangeSelected}
                value={value ? value : undefined}
            />
        )
    }

    renderHeader(title) {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        )
    }

    renderFooter(action) {
        return (
            <View style={{ height: 30 }} />
        )
    }

    renderField(settings, title) {
        const { selectedItem, getLabel } = settings;
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{title}</Text>
                <View style={styles.input}>
                    {selectedItem ?
                        <Text style={styles.inputDropDownText}>{getLabel(selectedItem)}</Text> :
                        <Text style={[styles.inputDropDownText, { color: Colors.placeholderTextColor }]}>{title}</Text>
                    }
                </View>
                <Icon
                    style={styles.iconMore}
                    name={"expand-more"}
                    size={32}
                    color={Colors.buttonPrimaryColor} />
            </View>
        )
    }
    renderOption(settings) {
        const { item, getLabel } = settings
        return (
            <View style={styles.optionContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.optionText}>{getLabel(item)}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18
    },
    headerContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 50,
        justifyContent: "center",
        backgroundColor: Colors.navigatorIconColor,
    },
    headerText: {
        fontFamily: Colors.fontFamily,
        color: Colors.secondaryColor,
        fontSize: 17
    },
    optionContainer: {
        paddingVertical: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderBottomColor: Colors.placeholderTextColor,
        borderBottomWidth: 0.5
    },
    optionInnerContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    box: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        width: "100%",
        fontFamily: Colors.fontFamily,
        color: "#000"
    },
    inputContainer: {
        fontFamily: Colors.fontFamily,
        borderColor: Colors.placeholderTextColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 11,
        marginTop: 15
    },
    inputLabel: {
        position: "absolute",
        left: 8,
        top: -8,
        paddingHorizontal: 2,
        fontSize: 12,
        backgroundColor: Colors.secondaryColor,
        fontFamily: Colors.fontFamily
    },
    option: {
        fontFamily: Colors.fontFamily
    },
    iconMore: {
        flex: 0,
        position: "absolute",
        bottom: 9,
        right: 15
    },
    optionText: {
        alignSelf: "flex-start",
        fontSize: 15,
        fontFamily: Colors.fontFamily
    },
    inputDropDownText: {
        width: "100%",
        marginTop: 15,
        fontFamily: Colors.fontFamily,
    },
})