import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Colors } from '../../themes/variables';
import { Button } from 'react-native-paper';

export const ImageIcon = ({ source }) => (
    <View style={styles.imageContainer}>
        <Image
            style={styles.image}
            resizeMode="contain"
            source={source}
        />
    </View>
);


const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: Colors.questionCenterIconColor,
        padding: 40,
        borderRadius: 90,
    },
    image: {
        width: 100,
        height: 100,
    }
});