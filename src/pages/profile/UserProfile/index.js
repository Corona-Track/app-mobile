import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {  Font } from '../../../themes/variables';

UserProfile.navigationOptions = {
    headerShown: false,
};
export default function UserProfile() {

    function Header() {
        return <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Icon name="map-marker"
                    color='white'
                    size={28} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="heartbeat"
                    color='white'
                    size={28} />
            </TouchableOpacity>
        </View>
    }

    function User() {
        const profileImage = { uri: 'https://pbs.twimg.com/media/DPS1jztXUAAEiF5?format=jpg&name=900x900' }
        return <View style={styles.userContainer}>
            <View style={styles.userImageContainer}>
                <Image style={styles.userImage} source={profileImage} />
            </View>
            <Text style={styles.user}>Maria José da Silva</Text>
        </View>
    }

    function Content() {
        return <View style={styles.content}>
            <TouchableOpacity>
                <Icon name="chevron-down"
                    color='white'
                    size={28} />
            </TouchableOpacity>
            <View style={styles.profileInfo}>
                <Text>Idade</Text>
                <Text>37 anos</Text>
                <Text>CPF</Text>
                <Text>987.654.321-00</Text>
                <Text>RG</Text>
                <Text>01.234.567-89</Text>
            </View>
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <User />
            <Content />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C4C4C4'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    userContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImageContainer: {
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 115,
        height: 115,
        width: 115,
        backgroundColor: '#27AE60',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImage: {
        height: 88,
        width: 88,
        borderRadius: 100
    },
    user: {
        paddingTop: 10,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: Font.fontFamily
    },
    content: {
        flex:1,
        alignItems: 'center',
        paddingTop: 10
    },
    profileInfo:{
        flex:1,
        paddingHorizontal:25,
        marginTop:10,
        backgroundColor:'white'
    }
})
