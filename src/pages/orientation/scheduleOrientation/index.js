import React, { useState, useEffect } from 'react'

// Components
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { Header } from 'react-native-elements';
import { LeftComponent, CenterComponent } from '../../../components/customheader';
import { getUser } from '../../../firebase/User';


ScheduleOrientation.navigationOptions = {
    headerShown: false
}

export default function ScheduleOrientation(props) {
    const { navigation } = props
    const [entity, setEntity] = useState({
        name: '',
        photo: ''
    })
    useEffect(() => {
        getUserData()
    }, [])

    function getUserData() {
        getUser().then(doc => {
            const { name, photo } = doc.data()
            setEntity({
                name,
                photo
            })
        })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    onLeftButtonPress = () => {
        navigation.pop();
    };

    return <View style={styles.page}>
        <Header
            containerStyle={styles.header}
            leftComponent={<LeftComponent onPress={onLeftButtonPress} />}
            centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
        />
        <WebView
            source={{ uri: 'https://www.aliancamedica.org' }}
            style={{ flex: 1 }}
        />
    </View>
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    header: {
        backgroundColor: '#FFFFFF'
    },
})