import React, { useState, useEffect } from 'react'

// Components
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header } from 'react-native-elements';
import { LeftComponent, CenterComponent, RightComponent } from '../../../components/customheader';
import { Button } from 'react-native-paper';
import Contagion from './components/Contagion'
import Aggravation from './components/Aggravation'

// Enums
import riskProfileTypes from "../../../utils/enums/riskProfileTypes";
import contagionRiskTypes from "../../../utils/enums/contagionRiskTypes";
import aggravationRiskTypes from "../../../utils/enums/aggravationRiskTypes";

// style
import { Colors } from '../../../themes/variables';
import { getUser } from '../../../firebase/Auth';


RiskProfile.navigationOptions = {
    headerShown: false
}


export default function RiskProfile(props) {
    const { navigation } = props
    const [riskProfile, setRiskProfile] = useState('')
    const [contagionRisk, setContagionRisk] = useState({
        risk: '',
        text: ''
    })
    const [aggravationRisk, setAggravationRisk] = useState({
        risk: '',
        text: ''
    })
    const [entity, setEntity] = useState({
        name: '',
        photo: ''
    })

    const riskProfileId = 3

    useEffect(() => {
        getUserData()
        getRiskInfo(riskProfileId)
    }, [])

    onLeftButtonPress = () => {
        navigation.pop();
    };
    onRightButtonPress = () => {
        navigation.pop();
    };

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

    function getRiskInfo(riskProfileId) {
        switch (riskProfileId) {
            case riskProfileTypes.GREEN: {
                setRiskProfile({
                    label: 'VERDE',
                    color: Colors.greenRiskProfile
                })
                setContagionRisk(contagionRiskTypes.LOW)
                setAggravationRisk(aggravationRiskTypes.LOW)
            }
                break;

            case riskProfileTypes.YELLOW: {
                setRiskProfile({
                    label: 'AMARELO',
                    color: Colors.yellowRiskProfile
                })
                setContagionRisk(contagionRiskTypes.LOW)
                setAggravationRisk(aggravationRiskTypes.MEDIUM)
            }
                break;

            case riskProfileTypes.RED: {
                setRiskProfile({
                    label: 'VERMELHO',
                    color: Colors.redRiskProfile
                })
                setContagionRisk(contagionRiskTypes.MEDIUM)
                setAggravationRisk(aggravationRiskTypes.HIGH)
            }
                break;
        }


    }

    function Title() {
        const titleStyle = {
            ...styles.title,
            color: riskProfile.color
        }
        return <View>
            <Text style={styles.label} >Seu Perfil é  </Text>
            <Text style={titleStyle}>{riskProfile.label}</Text>
        </View>
    }




    return <View style={styles.page}>
        <Header
            containerStyle={styles.header}
            leftComponent={<LeftComponent onPress={onLeftButtonPress} />}
            centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />}
            rightComponent={<RightComponent onPress={onRightButtonPress} />}
        />
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}>
            <Title />
            <Contagion text={contagionRisk.text} risk={contagionRisk.risk} />
            <Aggravation text={aggravationRisk.text} risk={aggravationRisk.risk} />

            <View style={styles.buttonsContainer}>
                <Button
                    style={styles.scheduleTeleorientationButton}
                    mode="contained"
                    color={'#FFFFFF'}
                    labelStyle={styles.scheduleTeleorientationText}
                >AGENDAR TELEORIENTAÇÃO</Button>

                <Button
                    style={styles.backToStarButton}
                    mode="contained"
                    color={Colors.buttonPrimaryColor}
                    labelStyle={styles.backToStarText}
                >VOLTAR PARA O INÍCIO</Button>
            </View>


        </ScrollView>


    </View>
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingTop:10
    },
    content: {
        alignItems: 'center',
        paddingBottom: 50,
    },
    header: {
        borderBottomWidth: 0,
        backgroundColor: '#FFFFFF'
    },
    label: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333333',
        textAlign: "center"
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: "center",

    },
    scheduleTeleorientationButton: {
        width: '100%',
        marginTop: 35,
        borderRadius: 50,
        height: 52,
        justifyContent: 'center',
        borderColor: Colors.buttonPrimaryColor,
        borderWidth: 1,

    },
    scheduleTeleorientationText: {
        color: Colors.buttonPrimaryColor,
        fontFamily: Colors.fontFamily,
    },
    backToStarButton: {
        width: '100%',
        marginTop: 20,
        borderRadius: 50,
        height: 52,
        justifyContent: 'center',
    },
    backToStarText: {
        color: Colors.primaryTextColor,
        fontFamily: Colors.fontFamily,
    },
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 35
    }
})
