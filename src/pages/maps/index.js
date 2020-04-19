import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, PermissionsAndroid, Platform, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../themes/variables';

// ASSETS
import cross from "../../assets/images/cross.png"
import contagionBar from "../../assets/images/contagionBar.png";

const Maps = (props) => {
  const [userLocation, setUserLocation] = useState();

  const onGPSErrorMessage = error => {
    if (error)
      console.log(error);
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
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05
        })
      },
      error => {
        onGPSErrorMessage(error);
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
        return;
      }
      onGPSErrorMessage();
    } catch (e) { onGPSErrorMessage(e); }
  };

  useEffect(() => {
    onGPSButtonPress();
  }, []);

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

  const [showCircle, setShowCircle] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>
          Minha Localização
        </Text>
        <TouchableOpacity style={{ position: "absolute", right: 20 }} onPress={() => {
          setUserLocation();
          props.navigation.pop();
        }}>
          <View>
            <Image style={styles.cross} source={cross} />
          </View>
        </TouchableOpacity>
      </View>

      {/* MAP */}
      {userLocation && userLocation.latitude &&
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={userLocation}
          onMapReady={() => setShowCircle(true)}
          showsUserLocation={true}
          minZoomLevel={1}
          maxZoomLevel={20}
        >
          <Marker
            coordinate={userLocation}
          />
          {
            showCircle && data && data.length > 0 && data.map((item, idx) => (
              <Circle
                key={idx}
                center={{
                  latitude: item.latitude,
                  longitude: item.longitude,
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
        <Image style={styles.bar} source={contagionBar} />
        <View style={styles.spacingText}>
          <View style={{ width: 50 }}>
            <Text style={styles.textBottom}>
              Leve Suspeita
            </Text>
          </View>
          <View style={{ width: 70 }}>
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
    width: "100%",
    backgroundColor: "#828282",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  textHeader: {
    width: "100%",
    fontSize: 19,
    color: Colors.primaryTextColor,
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: Colors.fontFamily,
    textAlign: "center"
  },
  cross: {
    width: 19,
    height: 19,
  },
  containerBottom: {
    backgroundColor: Colors.primaryTextColor,
    height: 100,
    bottom: 0,
    width: Dimensions.get("window").width,
    padding: 25,
    flexDirection: "column"
  },
  bar: {
    width: "auto",
    marginBottom: 10,
  },
  spacingText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textBottom: {
    fontSize: 12,
    textAlign: 'center',
    color: "#4F4F4F",
  }
});
