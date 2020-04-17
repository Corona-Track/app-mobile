import React, { useState } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import { Colors } from '../../../../themes/variables';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';

const aboutAggravation = "Ultilizamos como base os protocolos do ministerio da saude (MS) de COVID 19. Caso apresente alguma das comorbidades que nescessitam de acompnhamento em atençao especializada segundo o MS classificamos como um perfil de risco."
const referencesAggravation = "1. Protocolo de Manejo Cínico do Coronavírus (COVID-19) na Atenção Primária à Saúde | Versão 7"
export default function Aggravation(props) {

    const [aboutOpen, setAboutOpen] = useState(false)

    const { text, risk } = props
    const aggravationIllustration = require('../../../../assets/images/aggravationIllustration.png')


    function AboutButton() {
        const onPress = () => setAboutOpen(!aboutOpen)
        if (aboutOpen)
            return <TouchableOpacity style={styles.aboutButton} onPress={onPress}>
                <Icon name="chevron-thin-up" size={30} color="#828282" />
            </TouchableOpacity>

        return <TouchableOpacity onPress={onPress}>
            <Icon name="chevron-thin-down" size={30} color="#828282" />
        </TouchableOpacity>
    }


    function About() {
        if (aboutOpen)
            return <View style={styles.aboutContainer}>
                <Text style={styles.aboutLabel}>
                    Agravamento
                </Text>
                <Text style={styles.aboutText}>
                    {aboutAggravation}
                </Text>

                <Text style={styles.references}>
                    {referencesAggravation}        
                </Text>
            </View>

        return null
    }



    return <>
        <View style={styles.container}>
            <Image source={aggravationIllustration} style={styles.image} />
            <Text style={styles.label}>Seu Risco de Agravamento aparenta ser {risk}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
        <AboutButton />
        <About />
    </>
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50,
        alignItems: "center"
    },
    aboutContainer: {
        backgroundColor: '#F7F7F7',
        paddingVertical:40,
        paddingHorizontal: 50,
        width: '100%'
    },
    aboutLabel:{
        fontWeight:'bold',
        fontSize: 12,
        lineHeight: 17,
        fontFamily: Colors.fontFamily,
        color: Colors.notMainText,
    },
    aboutText:{
        textAlign:'justify',
        fontSize: 12,
        lineHeight: 17,
        fontFamily: Colors.fontFamily,
        color: Colors.notMainText,
    },
    references:{
        marginTop: 25,
        fontSize: 10,
        lineHeight: 17,
        fontFamily: Colors.fontFamily,
        color: Colors.notMainText,
    },
    image: {
        marginTop: 50,
        height: 60,
        width: 60
    },
    label: {
        marginTop: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 18,
        fontFamily: Colors.fontFamily,
        color: Colors.notMainText,
    },
    text: {
        marginTop: 25,
        paddingHorizontal: 15,
        textAlign: 'justify',
        fontWeight: '300',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Colors.fontFamily,
        color: '#333333',
    },
    aboutButton:{
        marginBottom:25,
    }
})
