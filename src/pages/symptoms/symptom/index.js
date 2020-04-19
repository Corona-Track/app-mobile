import React from "react"
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, Image,TouchableHighlight } from 'react-native';
import { LeftComponent, CenterComponent } from '../../../components/customheader';
import { Header } from 'react-native-elements';
import { Colors } from '../../../themes/variables';

import blueVirus from "../../../assets/images/blueVirus.png"
import stethoscope from "../../../assets/images/stethoscope.png"

const SymptomPage = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <Header
          backgroundColor={Colors.secondaryColor}
          leftComponent={<LeftComponent onPress={() => props.navigation.pop()} />}
          centerComponent={<CenterComponent photo={""} userName={"MARIA JOSÉ DA SILVA"} />}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.simpleText}>Minha <Text style={styles.boldText}>saúde:</Text></Text>
      </View>
      <View style={styles.containerButtons}>
        {/* STETHOSCOPE */}
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="transparent"
          onPress={() => props.navigation.push("ReportSymptoms")}
        >
          <View style={styles.wrap}>
            <View style={styles.circle}>
              <Image style={styles.stethoscope} source={stethoscope} />
            </View>
            <Text style={styles.reportText}>reportar sintomas</Text>
          </View>
        </TouchableHighlight>
        {/* VIRUS */}
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="transparent"
          onPress={() => props.navigation.push("ReportTest")}
        >
          <View style={styles.wrap}>
            <View style={styles.circle}>
              <Image style={styles.virus} source={blueVirus} />
            </View>
            <Text style={styles.reportText}>reportar teste</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

export default SymptomPage

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.secondaryColor,
    height:"100%",
  },
  title: {
    marginTop:20,
    alignItems:"center"
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
  containerButtons: {
    flex:2,
    justifyContent: "center",
    alignItems: "center",
  },
  wrap:{
    flexDirection: "column",
    alignItems: "center",
    marginBottom:70
  },
  circle: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: "#26B3C1",
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  virus: {
    height: 65,
    width: 64,
  },
  stethoscope:{
    height: 65,
    width: 70,
  },
  reportText:{
    marginTop: 10,
    fontSize: 18,
    color: "#26B3C1",
    fontWeight: "500",
    textTransform: "uppercase"
  }
})