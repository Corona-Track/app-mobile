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
            maxZoomLevel={15}>
            {this.renderMarkers(cornersMarkers)}
          </MapView>
        )}
        <MapBottom />
      </SafeAreaView>
    )
  };
  renderMarkers = (cornersMarkers) => {
    if (!cornersMarkers || (cornersMarkers && cornersMarkers.marker))
      return (<></>);
    return (<>
      {cornersMarkers.map((item, idx) => {
        return (<Circle
          key={idx}
          center={item.central}
          radius={(item.internalCircleDiameter.meters / 2)}
          strokeWidth={1}
          fillColor={item.circleColor === "red" ? red : yellow}
          strokeColor={item.circleColor === "red" ? red : yellow} />)
      })}
    </>)
  };
  updateCurrentLocation = region => {
    let { showLoading } = this.state;
    if (showLoading)
      return;
    this.setState({
      showLoading: true
    }, () => {
      let corners = getCornersBox(region);
      let markerCentral = {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      let markerNorthWest = {
        latitude: corners.northLatitude,
        longitude: corners.westLongitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      let markerSouthWest = {
        latitude: corners.southLatitude,
        longitude: corners.westLongitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      let markerNorthEast = {
        latitude: corners.northLatitude,
        longitude: corners.eastLongitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
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
      getMapElementsByPosition(filter)
        .then(response => this.onSuccessGetMapElementsByPosition(response, filter))
        .catch(this.onGPSErrorMessage)
        .finally(() => { this.setState({ showLoading: false }); });
    });
  };
  onSuccessGetMapElementsByPosition = (response, filter) => {
    let { data } = response;
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

const getCornersBox = region => {
  return {
    westLongitude: region.longitude - region.longitudeDelta / 2,
    southLatitude: region.latitude - region.latitudeDelta / 2,
    eastLongitude: region.longitude + region.longitudeDelta / 2,
    northLatitude: region.latitude + region.latitudeDelta / 2
  };
}

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