import React, {useEffect,useState} from 'react';
import MapView ,{ PROVIDER_GOOGLE, Marker,Circle } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service';
import {View,Text, StyleSheet, Image, SafeAreaView,Dimensions,PermissionsAndroid,Platform, TouchableHighlight} from 'react-native';
import { Colors } from '../../themes/variables';

// ASSETS
import cross from "../../assets/images/cross.png"
import contagionBar from "../../assets/images/contagionBar.png"

const Maps = (props) => {
  console.log(props)
  const [userLocation,setUserLocation]= useState();

  const onGPSErrorMessage = () => {
    Alert.alert(
        'Aviso!',
        "Falha ao acessar a sua localização, tente novamente mais tarde!",
        [{ text: 'OK' }],
        { cancelable: false }
    );
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
        position => {
          console.log(position)
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        error => {
            onGPSErrorMessage();
        }
    );
  };

  const onGPSButtonPress = async () => {
    if (Platform.OS === "ios") {
        await getLocation();
    }
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Acesso de localização',
            'message': 'Para buscar sua localização precisamos de sua permissão.'
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await getLocation();
        }
        onGPSErrorMessage();
    } catch { onGPSErrorMessage(); }
  };

  useEffect(() => {
    onGPSButtonPress();
  },[]);

  const red = "rgba(207, 84, 84,0.6)";
  const yellow = "rgba(233, 205, 106,0.6)";
  const blue = "rgba(136, 166, 231,0.6)";
  const orange = "rgba(247, 176, 84,0.6)";
  const green = "rgba(111, 219, 136,0.6)";

  // COORDINATES BASED ON MY LOCATION = LAT: -23.221476  LONG: -45.906629

  const data = [
    {
      latitude: -23.212005,
      longitude: -45.902983,
      color: red,
      diameter: 300
    },
    {
      latitude: -23.219270,
      longitude: -45.906924,
      color: blue,
      diameter: 400
    },
    {
      latitude: -23.231793,
      longitude: -45.906085,
      color: yellow,
      diameter: 700
    },
    {
      latitude: -23.225158,
      longitude: -45.890335,
      color: green,
      diameter: 350
    },
    {
      latitude: -23.237756,
      longitude: -45.887005,
      color: orange,
      diameter: 400
    },
    {
      latitude: -23.231329,
      longitude: -45.920235,
      color: red,
      diameter: 500
    },
  ]
  
  const [showCircle,setShowCircle] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.containerHeader}>
        <Text/>
        <Text style={styles.textHeader}>
          Minha Localização
        </Text>
        <TouchableHighlight onPress={() => {
          setUserLocation();
          props.navigation.navigate("Home");
        }}>
          <View>
            <Image style={styles.cross} source={cross}/>
          </View>
        </TouchableHighlight>
      </View>
      
      {/* MAP */}
      {userLocation && userLocation.latitude && 
        <MapView 
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={userLocation}
          onMapReady={() => setShowCircle(true)}
          showsUserLocation={true}
          minZoomLevel={1}
          maxZoomLevel={15}
        >
          <Marker
            coordinate={userLocation}
          />
          {
            showCircle && data && data.length > 0 && data.map((item,idx) => (
              <Circle
                key={idx}
                center={{
                  latitude:item.latitude,
                  longitude:item.longitude,
                }}
                radius={item.diameter}
                strokeWidth={1}
                fillColor={item.color}
                strokeColor={item.color}
              /> 
            ))
          }
        </MapView>
      }

      {/* Bottom */}
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
    backgroundColor: Colors.primaryTextColor,
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
    height: 100,
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
