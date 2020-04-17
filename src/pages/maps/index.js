import React, {useEffect} from 'react';
import MapView ,{ PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import {View,Text, StyleSheet, Image, SafeAreaView,Dimensions} from 'react-native';
import { Colors } from '../../themes/variables';

import cross from "../../assets/images/cross.png"
import contagionBar from "../../assets/images/contagionBar.png"

const Maps = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <Text/>
        <Text style={styles.textHeader}>
          Minha Localização
        </Text>
        <Image style={styles.cross} source={cross}/>
      </View>

      <MapView 
        // provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{ 
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}    
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: 42.882004,
            longitude: 74.582748,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </MapView>

      <View style={styles.containerBottom}>
        <Image style={styles.bar} source={contagionBar}/>
        <View style={styles.spacingText}>
          <View style={{width:50}}>
            <Text style={styles.textBottom}>
              Leve Suspeita
            </Text>
          </View>
          <View style={{width:70}}>
            <Text style={styles.textBottom}>
              Sério risco de contágio
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Maps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  containerHeader: {
    height: 70,
    backgroundColor: "#828282",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25
  },
  textHeader: {
    fontSize: 20,
    color: Colors.primaryTextColor,
    textTransform: "uppercase",
    fontWeight: "600"
  },
  cross: {
    width: 20,
    height: 20,
  },
  containerBottom: {
    backgroundColor: Colors.primaryTextColor,
    height: 135,
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
    padding:25,
    flexDirection:"column"
  },
  bar: {
    width:"auto",
    marginBottom:10,
  },
  spacingText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textBottom: {
    fontSize:12,
    textAlign:'center',
    color:"#4F4F4F",
  }
});
