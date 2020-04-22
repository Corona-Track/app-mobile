import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  PermissionsAndroid,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import { Colors } from '../../themes/variables';
import cross from '../../assets/images/cross.png';
import contagionBar from '../../assets/images/contagionBar.png';
import { getMapElementsByPosition } from '../../services/mapservice';


let map = null;
export default class MapsPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  state = {
    userLocation: {
      latitude: null,
      longitude: null,
      longitudeDelta: 0.05,
      latitudeDelta: 0.05,
    },
    currentLocation: {
      latitude: null,
      longitude: null,
      longitudeDelta: 0.05,
      latitudeDelta: 0.05,
    },
    mapKey: null,
    cornersMarkers: [],
  };


  initialize = () => {
    this.getUserLocation()
      .catch(this.onGPSErrorMessage);
  };
  render = () => {
    let { mapKey, userLocation, currentLocation, cornersMarkers, showLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
        <Spinner visible={showLoading} />
        <MapHeader onPress={this.closeMap} />
        {userLocation && userLocation.latitude && (
          <MapView
            ref={map => { this.map = map }}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={currentLocation}
            onRegionChangeComplete={this.updateCurrentLocation}
            showsUserLocation={true}
            loadingEnabled={true}
            minZoomLevel={1}
            maxZoomLevel={20}>
            {cornersMarkers.map((item, idx) => {
              return (
                <Marker coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                  longitudeDelta: 0.05,
                  latitudeDelta: 0.05,
                }} />
              )
            })}
            {/* <Marker coordinate={{
              latitude: -23.1805011,
              longitude: -45.8872969,
              longitudeDelta: 0.05,
              latitudeDelta: 0.05,
            }} /> */}
            {/* <Marker coordinate={userLocation} /> */}
            {data &&
              data.length > 0 &&
              data.map((item, idx) => (
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
              ))}
          </MapView>
        )}
        <MapBottom />
      </SafeAreaView>
    )
  };
  updateCurrentLocation = region => {
    // let { currentLocation } = this.state;
    // if (currentLocation.latitude === region.latitude &&
    //   currentLocation.longitude === region.longitude &&
    //   currentLocation.latitudeDelta === region.latitudeDelta &&
    //   currentLocation.longitudeDelta === region.longitudeDelta)
    //   return;

    let { showLoading } = this.state;
    if (showLoading)
      return;

    this.setState({
      showLoading: true
    }, () => {
      let corners = getCornersBox(region);
      // N
      // W E
      // S
      // console.log("central region");
      // console.log("LA");
      // console.log(region.latitude);
      // console.log("LO");
      // console.log(region.longitude);

      let markerCentral = {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };

      console.log("markerCentral")
      console.log("LAD:" + markerCentral.latitudeDelta);
      console.log("LOD:" + markerCentral.longitudeDelta);

      // console.log("WLO");
      // console.log(corners.westLongitude);
      let markerNorthWest = {
        latitude: corners.northLatitude,
        longitude: corners.westLongitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };

      // console.log("markerSouthWest region");
      // console.log("SLA");
      // console.log(corners.southLatitude);
      // console.log("WLO");
      // console.log(corners.westLongitude);
      let markerSouthWest = {
        latitude: corners.southLatitude,
        longitude: corners.westLongitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };

      // console.log("markerNorthEast region");

      // console.log("NLA");
      // console.log(corners.northLatitude);
      // console.log("ELO");
      // console.log(corners.eastLongitude);
      let markerNorthEast = {
        latitude: corners.northLatitude,
        longitude: corners.eastLongitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      // console.log("markerSouthEast region");
      // console.log("SLA");
      // console.log(corners.southLatitude);
      // console.log("ELO");
      // console.log(corners.eastLongitude);
      let markerSouthEast = {
        latitude: corners.southLatitude,
        longitude: corners.eastLongitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      let filter = {
        markerCentral,
        markerNorthWest,
        markerSouthWest,
        markerNorthEast,
        markerSouthEast,
      };
      console.log("============================");
      console.log("============================");
      let { userLocation } = this.state;
      console.log("ULA" + userLocation.latitude);
      console.log("ULO" + userLocation.longitude);
      // console.log("NW");
      // console.log("LA: " + corners.northLatitude);
      // console.log("LO: " + corners.westLongitude);
      // console.log("NE");
      // console.log("LA: " + corners.northLatitude);
      // console.log("LO: " + corners.eastLongitude);
      // console.log("----------------------------");
      // console.log("SJK");
      // console.log("latitude: -23.1805011");
      // console.log("longitude: -45.8872969");
      // console.log("----------------------------");
      // console.log("SW");
      // console.log("LA: " + corners.southLatitude);
      // console.log("LO: " + corners.westLongitude);
      // console.log("SE");
      // console.log("LA: " + corners.southLatitude);
      // console.log("LO: " + corners.eastLongitude);
      getMapElementsByPosition(filter)
        .then(response => this.onSuccessGetMapElementsByPosition(response, filter))
        .catch(this.onGPSErrorMessage)
        .finally(() => { this.setState({ showLoading: false }); });
    });
  };

  onSuccessGetMapElementsByPosition = (response, filter) => {
    let { data } = response;
    console.log("filter:" + JSON.stringify(filter));
    console.log("data:" + JSON.stringify(data));
    this.setState({
      currentLocation: filter.markerCentral,
      mapKey: Math.floor(Math.random() * 100),
      cornersMarkers: data
    });
  };

  getUserLocation = async () => {
    if (Platform.OS === 'ios') {
      await this.getLocation();
      return;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Acesso de localização',
          message: 'Para buscar sua localização precisamos de sua permissão.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await this.getLocation();
        return;
      }
      this.onGPSErrorMessage();
    } catch (e) { this.onGPSErrorMessage(e); }
  };
  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05
        };
        this.setState({
          userLocation: userLocation,
          currentLocation: userLocation
        });
      },
      error => {
        this.onGPSErrorMessage(error);
      }
    );
  };
  onGPSErrorMessage = error => {
    this.setState({ showLoading: false });
    if (error)
      console.log(error);
    Alert.alert(
      'Aviso!',
      'Falha ao acessar a sua localização, tente novamente mais tarde!',
      [{ text: 'OK' }],
      { cancelable: false },
    );
  };
  closeMap = () => {
    this.props.navigation.pop();
  };
}

const red = 'rgba(207, 84, 84,0.6)';
const yellow = 'rgba(233, 205, 106,0.6)';
const blue = 'rgba(136, 166, 231,0.6)';
const orange = 'rgba(247, 176, 84,0.6)';
const green = 'rgba(111, 219, 136,0.6)';


let data = [
  {
    latitude: -23.212005,
    longitude: -45.902983,
    color: red,
    diameter: 300,
  },
  {
    latitude: -23.21927,
    longitude: -45.906924,
    color: blue,
    diameter: 400,
  },
  {
    latitude: -23.231793,
    longitude: -45.906085,
    color: yellow,
    diameter: 700,
  },
  {
    latitude: -23.225158,
    longitude: -45.890335,
    color: green,
    diameter: 350,
  },
  {
    latitude: -23.237756,
    longitude: -45.887005,
    color: orange,
    diameter: 400,
  },
  {
    latitude: -23.231329,
    longitude: -45.920235,
    color: red,
    diameter: 500,
  },
];

const getCornersBox = region => {
  return {
    westLongitude: region.longitude - region.longitudeDelta / 2,
    southLatitude: region.latitude - region.latitudeDelta / 2,
    eastLongitude: region.longitude + region.longitudeDelta / 2,
    northLatitude: region.latitude + region.latitudeDelta / 2
  };
}

// [
//   region.longitude - region.longitudeDelta / 2, // westLng - min lng
//   region.latitude - region.latitudeDelta / 2, // southLat - min lat
//   region.longitude + region.longitudeDelta / 2, // eastLng - max lng
//   region.latitude + region.latitudeDelta / 2 // northLat - max lat
// ]}

const MapHeader = ({ onPress }) => (
  <View style={styles.containerHeader}>
    <Text style={styles.textHeader}>Minha Localização</Text>
    <TouchableOpacity
      style={styles.closeButtonHeader}
      onPress={onPress}>
      <View>
        <Image style={styles.cross} source={cross} />
      </View>
    </TouchableOpacity>
  </View>
);

const MapBottom = () => (
  <View style={styles.containerBottom}>
    <Image style={styles.bar} source={contagionBar} />
    <View style={styles.spacingText}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.textBottom}>Leve</Text>
        <Text style={styles.textBottom}>Suspeita</Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.textBottom}>Sério risco</Text>
        <Text style={styles.textBottom}>de contágio</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryTextColor,
  },
  containerHeader: {
    height: 70,
    width: '100%',
    backgroundColor: '#828282',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textHeader: {
    width: '100%',
    fontSize: 19,
    color: Colors.primaryTextColor,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontFamily: Colors.fontFamily,
    textAlign: 'center',
  },
  cross: {
    width: 19,
    height: 19,
  },
  containerBottom: {
    backgroundColor: Colors.primaryTextColor,
    height: 100,
    bottom: 0,
    width: Dimensions.get('window').width,
    padding: 25,
    flexDirection: 'column',
  },
  bar: {
    width: 'auto',
    marginBottom: 10,
  },
  spacingText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBottom: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4F4F4F',
  },
  closeButtonHeader: {
    position: 'absolute',
    right: 20
  }
});