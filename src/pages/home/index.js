import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ImageBackground, TouchableOpacity, View, ScrollView, Animated } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { PanGestureHandler, State } from 'react-native-gesture-handler';


import { Colors } from '../../themes/variables';
import { signOut } from '../../firebase/Auth';

const translateY = new Animated.Value(0);
const animatedEvent = Animated.event(
  [
    {
      nativeEvent: {
        translationY: translateY
      }
    }
  ],
  { useNativeDriver: true },
);
let offset = 0;

export default class HomePage extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    showLoading: false,
    currentUser: {}
  };
  setSignOut = () => {
    signOut()
      .then(() => { this.props.navigation.navigate('Login'); })
      .catch(error => { console.error(error); });
  };
  initialize = () => {
    let currentUser = auth().currentUser;
    this.setState({ showLoading: false, currentUser: currentUser });
  };

  onSymptomsButtonPress = () => {
    console.log("Symptoms");
    this.props.navigation.navigate("Symptoms");
  };

  onMapButtonPress = () => {
    this.props.navigation.navigate("Maps");
  };

  render = () => {
    let { showLoading, currentUser } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={showLoading} />
        <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
        <ImageBackground
          source={require('../../assets/images/homebackground.png')}
          resizeMethod="auto"
          style={styles.backgroundImageStyle} />
        <View>
          <MapButton onPress={this.onMapButtonPress} />
          <HeartButton />
        </View>
        <View style={{ marginTop: 50 }}>
          <UserDetails
            onPress={this.executeCardAnimation}
            photo={currentUser.photo}
            name={"Maria José da Silva"}
            aliasName={this.getFirstLetterName("Maria José da Silva")} />
          {this.renderCard()}
          {/* <UserDetails photo={currentUser.photo} name={currentUser.name} aliasName={this.getFirstLetterName(currentUser.name)} /> */}
          <View>
            <Animated.ScrollView style={{
              height: 300,
              opacity: translateY.interpolate({
                inputRange: [0, 200],
                outputRange: [0, 1]
              })
            }}>
              <View style={{ height: 300, marginHorizontal: 40 }}>
                {/* <UserPersonalData age="21" cpf="123.132.123-00" rg="21.211.222-7" /> */}
                {this.renderOptionsList()}
                <VersionDetails />
              </View>
            </Animated.ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  getFirstLetterName = name => {
    if (!name)
      return null;
    return name.trim().charAt(0).toUpperCase();
  };
  renderOptionsList = () => {
    return (
      <View style={{ width: "100%" }}>
        <MenuItem icon="account" name="INFORMAÇÕES DO PERFIL" />
        <MenuItem onPress={() => this.navigateScreen("Symptoms")} icon="heart-pulse" name="MINHA SAÚDE" />
        <MenuItem onPress={() => this.navigateScreen("Orientation")} icon="monitor" name="TELEORIENTAÇÃO" />
        <MenuItem icon="account" name="UTILIDADE PÚBLICA" />
        <MenuItem icon="settings" name="CONFIGURAÇÕES" />
        <MenuItem onPress={this.setSignOut} icon="logout" name="SAIR" />
      </View>
    );
  };
  renderCard = () => {
    return (
      <View style={styles.cardContent}>
        <PanGestureHandler onGestureEvent={animatedEvent} onHandlerStateChange={this.onHandlerStateChange}>
          <Animated.View style={[styles.card, {
            transform: [{
              translateY: translateY.interpolate({
                inputRange: [-350, 0, 250],
                outputRange: [-50, 0, 250],
                extrapolate: "clamp"
              }),
            }]
          }]}>
            <View style={{}}>
              <Text numberOfLines={1} style={styles.cardText}><Text numberOfLines={1} style={styles.boldText}>Idade: </Text>37 anos</Text>
              <Text numberOfLines={1} style={styles.cardText}><Text numberOfLines={1} style={styles.boldText}>CPF: </Text>987.654.321-00</Text>
              <Text numberOfLines={1} style={styles.cardText}><Text numberOfLines={1} style={styles.boldText}>RG: </Text>01.234.567-89</Text>
            </View>
            <Image style={styles.imageContainer}
              source={{ uri: "https://canaltech.com.br/conteudo/Pedro/O_que_e_QRcode/qr_code_ud.jpg" }} />
            <Text numberOfLines={1} style={[styles.cardText, { fontSize: 12 }]}>Você é perfil <Text numberOfLines={1} style={styles.boldText}>VERDE</Text></Text>
            <ProfileButton />
          </Animated.View>
        </PanGestureHandler >
      </View>
    )
  };
  onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY } = event.nativeEvent;
      let opened = false;
      offset += translationY;
      if (translationY >= 100)
        opened = true;
      else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      Animated.timing(translateY, {
        toValue: opened ? 250 : 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        offset = opened ? 250 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  };
  executeCardAnimation = () => {
    let opened = false;
    let goToOffset = offset === 250 ? 0 : 250;
    if (goToOffset === 250)
      opened = true;
    else {
      translateY.setValue(offset);
      translateY.setOffset(0);
      offset = 0;
    }
    Animated.timing(translateY, {
      toValue: goToOffset,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      offset = goToOffset;
      translateY.setOffset(offset);
      translateY.setValue(0);
    });
  };
  navigateScreen = screen => {
    this.props.navigation.navigate(screen);
  };
};

const MapButton = ({ onPress }) => (
  <TouchableOpacity style={styles.mapButton} onPress={onPress}>
    <Icon
      name="map-marker-outline"
      size={40}
      color={Colors.secondaryColor} />
  </TouchableOpacity>
);

const HeartButton = ({ onPress }) => (
  <TouchableOpacity style={styles.heartButton} onPress={onPress}>
    <Icon
      name="heart-pulse"
      size={40}
      color={Colors.secondaryColor} />
  </TouchableOpacity>
);

const UserDetails = ({ photo, name, aliasName, onPress }) => (
  <View style={styles.userDetailsContainer}>
    <View style={styles.userDetailsInnerContainer}>
      <View style={[styles.riskContainer, { borderColor: "#27AE60" }]}>
        {photo && <Image
          source={{ uri: photo }}
          style={styles.imageStyle} />}
        {!photo && <Avatar rounded size={100} title={aliasName} />}
      </View>
    </View>
    <Text numberOfLines={1} style={styles.userName}><Text numberOfLines={1} style={styles.boldText}>{name}</Text></Text>
    <TouchableOpacity onPress={() => { onPress() }}>
      <Icon
        name={"chevron-down"}
        size={40}
        color={Colors.secondaryColor} />
    </TouchableOpacity>
  </View>
);

// const UserPersonalData = ({ age, cpf, rg }) => (
//   <View style={styles.userPersonalDataContainer}>
//     <Text numberOfLines={1} style={styles.userPersonalDataText}><Text numberOfLines={1} style={styles.boldText}>Idade: </Text>{age}</Text>
//     <Text numberOfLines={1} style={styles.userPersonalDataText}><Text numberOfLines={1} style={styles.boldText}>CPF: </Text>{cpf}</Text>
//     <Text numberOfLines={1} style={styles.userPersonalDataText}><Text numberOfLines={1} style={styles.boldText}>RG: </Text>{rg}</Text>
//   </View>
// );

const MenuItem = ({ icon, name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItemContainer}>
    <View style={styles.menuItemFirstColumn}>
      <Icon
        name={icon}
        size={32}
        color={Colors.secondaryColor} />
    </View>
    <View style={styles.menuItemSecondColumn}>
      <Text numberOfLines={1} style={styles.menuItemText}>{name}</Text>
    </View>
  </TouchableOpacity>
);

const VersionDetails = () => (
  <View style={styles.versionContainer}>
    <Text numberOfLines={1} style={styles.versionText}>Versão 1.0.0</Text>
  </View>
);

const ProfileButton = ({ onPress }) => (
  <View style={styles.buttonContainer}>
    <Button
      style={styles.innerButtonContainer}
      contentStyle={styles.contentButton}
      mode="contained"
      color={"#27AE60"}
      labelStyle={styles.buttonText}
      onPress={onPress}>ENTENDA MELHOR O SEU PERFIL</Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.notMainText,
    height: '100%',
  },
  backgroundImageStyle: {
    flex: 1,
    width: "100%",
    height: 300,
    position: "absolute",
    marginTop: 30
  },
  mapButton: {
    flex: 0,
    position: "absolute",
    left: 15,
    top: 15,
    width: 40,
    height: 40,
  },
  heartButton: {
    flex: 0,
    position: "absolute",
    right: 15,
    top: 15,
    width: 40,
    height: 40,
  },
  userDetailsContainer: {
    width: "100%",
    alignItems: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderColor: "#FFFFFF",
    borderWidth: 2
  },
  userDetailsInnerContainer: {
    borderWidth: 4,
    borderRadius: 100,
    borderColor: "#FFFFFF"
  },
  riskContainer: {
    borderWidth: 15,
    borderRadius: 100
  },
  userName: {
    fontFamily: Colors.fontFamily,
    color: Colors.primaryTextColor,
    fontSize: 18,
    marginTop: 10,
    maxWidth: "80%"
  },
  boldText: {
    fontWeight: "bold"
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#A7A7A7",
    padding: 0
  },
  menuItemFirstColumn: {
    width: "15%",
    justifyContent: "center"
  },
  menuItemSecondColumn: {
    width: "85%",
    justifyContent: "center"
  },
  menuItemText: {
    fontFamily: Colors.fontFamily,
    color: "#FFFFFF"
  },
  userPersonalDataText: {
    fontFamily: Colors.fontFamily,
    color: Colors.primaryTextColor,
    fontSize: 18,
    marginVertical: 2,
  },
  userPersonalDataContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20
  },
  versionContainer: {
    width: "100%",
    marginTop: 15
  },
  versionText: {
    fontFamily: Colors.fontFamily,
    color: "#FFFFFF",
  },
  cardText: {
    textAlign: "center",
    fontFamily: Colors.fontFamily,
    fontSize: 15,
    marginVertical: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginVertical: 10
  },
  buttonContainer: {
    marginHorizontal: 20
  },
  innerButtonContainer: {
    borderRadius: 50,
  },
  contentButton: {
    height: 40,
    textAlign: "center",
  },
  buttonText: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
    fontSize: 11
  },
  cardContent: {
    flex: 1,
    zIndex: 5,
    height: "100%",
    flexDirection: "column"
  },
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 4,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    marginHorizontal: 20
  }

});
