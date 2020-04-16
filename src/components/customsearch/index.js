import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../themes/variables';
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialIcons";

export const CustomSearch = ({ listToSearch, selected, placeholder, value, onChangeText, onTagClick }) => {
    let tags = [
        {
            identifier: "Teste",
            text: "Teste"
        },
        {
            identifier: "Teste",
            text: "Teste"
        },
        {
            identifier: "Teste",
            text: "Teste"
        },
        {
            identifier: "Teste",
            text: "Teste"
        },
        {
            identifier: "Teste",
            text: "Teste"
        },
    ];


    return (
        <View style={styles.searchBox}>
            <SearchBar
                containerStyle={{ backgroundColor: Colors.searchBackgroundColor, }}
                lightTheme
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                inputContainerStyle={{ backgroundColor: "#FFF" }}
                showLoading={true} />
            {value ? (
                <ScrollView style={styles.searchItemsContainer} nestedScrollEnabled={true}>
                    <Text>Atrite</Text>
                    <Text>Palpitação</Text>
                    <Text>Cirrose</Text>
                    <Text>Bronquite</Text>
                    <Text>Atrite</Text>
                    <Text>Palpitação</Text>
                    <Text>Cirrose</Text>
                    <Text>Bronquite</Text>
                    <Text>Atrite</Text>
                    <Text>Palpitação</Text>
                    <Text>Cirrose</Text>
                    <Text>Bronquite</Text>
                </ScrollView>
            ) : (<></>)}
            <View style={styles.tagContainer}>
                {tags.map(tag => {
                    return (<TouchableOpacity onPress={() => { onTagClick(tag) }} style={styles.tagStyle}>
                        <Text numberOfLines={2} style={styles.tagTextStyle} >{tag.text}</Text>
                        <Icon name="close" size={20} style={styles.closeIcon} />
                    </TouchableOpacity>)
                })}
            </View>
        </View>)
};


const styles = StyleSheet.create({
    searchBox: {
        backgroundColor: Colors.searchBackgroundColor,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 10,
        paddingHorizontal: 10
    },
    tagStyle: {
        backgroundColor: Colors.navigatorIconColor,
        borderRadius: 20,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.navigatorIconColor,
        paddingHorizontal: 10,
        marginHorizontal: 2,
        marginVertical: 2,
        flexDirection: 'row',
    },
    tagTextStyle: {
        color: Colors.primaryTextColor,
        textAlign: "center",
        textAlignVertical: "center",
        height: 40,
        fontFamily: Colors.fontFamily
    },
    closeIcon: {
        color: Colors.secondaryColor,
        textAlignVertical: "center",
        marginLeft: 5
    },
    searchItemsContainer: {
        backgroundColor: Colors.secondaryColor,
        height: 200,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
});
