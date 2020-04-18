import React, { useState } from 'react'

// Components
import { StyleSheet, Text, Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

// styles
import { Colors } from '../../../../themes/variables';

const aboutContagion = "Nosso algoritmo baseia-se nas informações reportadas pelo próprio usuário no aplicativo e seus sintomas sende estes os sintomas caracteristicos da doenca segundo ministerio da saude e sua prevalencia segundo as fontes ultilizadas por eles. Assim como práticas de higiene, bem como no seu autorrelato sobre o teste de COVID-19 (caso tenha feito um). Em futuras versões pretendemos utilizar dados de bluetooth e geolocalização para refinar os resultados.\n\nDadas as limitações do nosso algoritmo e o atual momento que vivemos, você deve seguir as recomendações gerais do Ministério da Saúde para evitar a disseminação do vírus."
const referencesContagion = "1. DIRETRIZES PARA DIAGNÓSTICO E TRATAMENTO DA COVID-19 | Versão 1 \n\n 2. Guan W, Ni Z, Hu Y, Liang W, Ou C, He J, et al. Clinical Characteristics of Coronavirus Disease 2019 in China. N Engl J Med. 2020;1–13."

function Contagion(props) {
    const [aboutOpen, setAboutOpen] = useState(false)
    const { text, risk } = props
    const contagionIllustration = require('../../../../assets/images/contagionIllustration.png')


    function AboutButton() {
        const onPress = () => setAboutOpen(!aboutOpen)
        if (aboutOpen)
            return <TouchableOpacity style={styles.aboutButton} onPress={onPress}>
                <Icon name="chevron-thin-up" size={30} color="#828282" />
            </TouchableOpacity>

        return <TouchableOpacity style={styles.aboutButton} onPress={onPress}>
            <Icon name="chevron-thin-down" size={30} color="#828282" />
        </TouchableOpacity>
    }
    function About() {
        if (aboutOpen)
            return <View style={styles.aboutContainer}>
                <Text style={styles.aboutLabel}>
                    Contágio
                </Text>
                <Text style={styles.aboutText}>
                    {aboutContagion}
                </Text>

                <Text style={styles.references}>
                    {referencesContagion}
                </Text>
            </View>

        return null
    }

    return <>
        <View style={styles.container}>
            <Image source={contagionIllustration} style={styles.image} />
            <Text style={styles.label}>Seu Risco de Contágio aparenta ser {risk}</Text>
            <Text style={styles.text}>{text}</Text>
            <AboutButton />
        </View>
        <About />
    </>
}

export default Contagion

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 50,
        alignItems: "center",
        borderBottomColor: '#F7F7F7',
        borderBottomWidth: 1.5
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
        textAlign: 'justify',
        fontWeight: '300',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Colors.fontFamily,
        color: '#333333',
    },
    aboutButton: {
        marginBottom: 25,
    },
    aboutContainer: {
        backgroundColor: '#F7F7F7',
        paddingVertical: 40,
        paddingHorizontal: 50,
        width: '100%'
    },
    aboutLabel: {
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 17,
        fontFamily: Colors.fontFamily,
        color: Colors.notMainText,
    },
    aboutText: {
        textAlign: 'justify',
        fontSize: 12,
        lineHeight: 17,
        fontFamily: Colors.fontFamily,
        color: Colors.notMainText,
    },
    references: {
        textAlign: 'justify',
        marginTop: 25,
        fontSize: 10,
        lineHeight: 17,
        fontFamily: Colors.fontFamily,
        color: Colors.notMainText,
    },
})
