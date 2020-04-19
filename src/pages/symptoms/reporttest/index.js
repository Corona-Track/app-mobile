import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, Image,TouchableHighlight } from 'react-native';
import { LeftComponent, CenterComponent } from '../../../components/customheader';
import { Header } from 'react-native-elements';
import { Colors } from '../../../themes/variables';

import {
  ConfirmButton,
  DenyButton,
  DoubtButton,
} from '../../../components/custombutton';
import virus from "../../../assets/images/virus.png"
import {ImageIcon} from '../../../components/customimageicon';

import ResultTestDay from "../resulttestday"

const ReportTestPage = (props) => {

  console.log(props)

  const [hadTest,setHadTest] = useState(false)

  const changeCoronaState = () => {
    setHadTest(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <Header
          backgroundColor={Colors.secondaryColor}
          leftComponent={<LeftComponent onPress={() => props.navigation.pop()} />}
          centerComponent={<CenterComponent photo={""} userName={"MARIA JOSÉ DA SILVA"} />}
        />
      </View>
      {
        hadTest === false ? hadCoronavirus(props,changeCoronaState) : <ResultTestDay hadTest={hadTest} navigation={props}/>
      }
    </SafeAreaView>
  )
}

export default ReportTestPage

const hadCoronavirus = (props,changeCoronaState) => (
  <View style={{flex:1,alignItems:"center"}}>
    <View style={{flex: 0.6, justifyContent: 'center'}}>
      <IntroText />
      <View style={styles.avatarContainer}>
        <ImageIcon source={virus} />
      </View>
    </View>
    <View style={{flex: 0.4, width: '100%', paddingHorizontal: 20}}>
      <DenyButton
        onPress={() => props.navigation.pop()}
      />
      <ConfirmButton
        onPress={changeCoronaState}
      />
      <DoubtButton
        onPress={() => {
          console.log("aguardando o resultado")
        }}
        label="Fiz porém estou aguardando o resultado"
      />
    </View>
  </View>
)

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={styles.simpleText}>Vocé realizou o</Text>
    <Text style={styles.simpleText}>
      <Text style={styles.boldText}>teste para o coronavírus?</Text>
    </Text>
  </View>
);


const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.secondaryColor,
    height:"100%",
  },
  simpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 18,
    color:"#333",
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    color:"#333",
  },
  avatarContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
})