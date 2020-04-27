import React, { useState, useEffect } from 'react'

// Components
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { Header } from 'react-native-elements';
import { LeftComponent, CenterComponent } from '../../components/customheader';
import { getUser } from '../../firebase/User';
import { Colors } from '../../themes/variables';


PublicUtilityPage.navigationOptions = {
    headerShown: false
}

export default function PublicUtilityPage(props) {
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
        }).catch(err => { Alert.alert("Aviso!", "Falha ao carregar a página web, tente novamente mais tarde."); });
    }

    onLeftButtonPress = () => {
        navigation.pop();
    };

    return <SafeAreaView style={styles.page}>
        <View style={{ width: '100%', marginHorizontal: 20 }}>
            <Header
                containerStyle={styles.header}
                leftComponent={<LeftComponent onPress={onLeftButtonPress} />}
                centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />} />
        </View>
        <WebView
            source={{ uri: 'https://coronatrackbrasil.com.br/utilidade-publica/' }}
            style={{ flex: 1, marginTop: 10 }} />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    header: {
        backgroundColor: Colors.secondaryColor
    },
})