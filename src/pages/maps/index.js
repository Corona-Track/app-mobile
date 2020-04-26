import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import auth from '@react-native-firebase/auth';

import { Colors } from '../../themes/variables';
import cross from '../../assets/images/cross.png';
import { getMapElementsByPosition } from '../../services/mapservice';
import { getUser } from '../../firebase/User';
import { getCitiesAroundUser, saveUserPosition } from '../../firebase/UsersPosition';
import { searchNearestCity } from '../../services/userspositionservice';


let map = null;
export default class MapsPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  state = {
    isMapEnabled: false,
    currentUser: null,
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
    getUser()
      .then(this.onGetUserDataSuccess)
      .catch(this.onGetUserDataFailure);
  };
  onGetUserDataSuccess = doc => {
    let currentUser = doc.data();
    this.setState({ currentUser }, () => {
      this.getUserLocation()
        .catch(this.onGPSErrorMessage);
    });
  };
  onGetUserDataFailure = error => {
    if (error)
      console.log(error);
    Alert.alert("Aviso!", "Houve um erro buscar seus dados, tente novamente mais tarde.");
  };


  render = () => {
    let { isMapEnabled, userLocation, currentLocation, cornersMarkers } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents overlayColor="rgba(0, 0, 0, 0.80)" onDidFocus={() => this.initialize(this.props)} />
        <MapHeader onPress={this.closeMap} />
        {isMapEnabled && userLocation && userLocation.latitude && (
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
        {!isMapEnabled && (<ActivityIndicator size="large" />)}
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
    this.setState({
      currentLocation: region,
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
        .catch(this.onGPSErrorMessage);
    });
  };
  onSuccessGetMapElementsByPosition = (response, filter) => {
    let { data } = response;
    this.setState({
      mapKey: Math.floor(Math.random() * 100),
      cornersMarkers: data,
      isMapEnabled: true
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
        }, () => { this.getUserCity(); });
      },
      error => {
        this.onGPSErrorMessage(error);
      }
    );
  };
  onGPSErrorMessage = error => {
    if (error)
      console.log(JSON.stringify(error));
    if (error.message && error.message === "Request failed with status code 429") {
      Alert.alert(
        'Aviso!',
        'Você atingiu o limite de requisições, aguarde alguns minutos e tente novamente!',
        [{ text: 'OK' }],
        { cancelable: true },
      );
      return;
    }
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
  getUserCity = () => {
    let { userLocation } = this.state;
    getCitiesAroundUser(userLocation)
      .then(this.onGetCitiesSuccess)
      .catch(this.onGetUserDataFailure);
  };
  onGetCitiesSuccess = cities => {
    if (!cities || (cities && cities.length === 0))
      return;
    let { userLocation, currentUser, currentLocation } = this.state;
    let userCity = searchNearestCity(userLocation, cities);
    if (!userCity)
      return;
    const { uid } = auth().currentUser;
    let { question, contagionRisk } = currentUser;
    let userPosition = {
      cityReference: userCity.ibgeid,
      contagionRisk: contagionRisk ?? 1,
      contaminated: question.contaminated,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      userId: uid
    };
    saveUserPosition(userPosition)
      .then(() => { this.updateCurrentLocation(currentLocation); })
      .catch(this.onGetUserDataFailure);
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
    <View style={styles.spacingText}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", width: 50 }}>
          <Icon name={"circle"} size={32} color={yellow} />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.textBottom}>Leve</Text>
          <Text style={styles.textBottom}>Suspeita</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", width: 50 }}>
          <Icon name={"circle"} size={32} color={red} />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.textBottom}>Sério risco</Text>
          <Text style={styles.textBottom}>de contágio</Text>
        </View>
      </View>
    </View>
  </View >
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
    height: 70,
    bottom: 0,
    width: Dimensions.get('window').width,
    padding: 20,
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