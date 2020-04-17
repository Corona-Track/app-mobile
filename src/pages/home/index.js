import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ImageBackground, TouchableOpacity, View, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar } from 'react-native-elements';

import { Colors } from '../../themes/variables';
import { signOut } from '../../firebase/Auth';

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
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
  };
  initialize = () => {
    let currentUser = auth().currentUser;
    this.setState({ showLoading: false, currentUser: currentUser });
  };
  componentDidMount() { }
  render = () => {
    let { showLoading, currentUser } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={showLoading} />
        <NavigationEvents onDidFocus={() => this.initialize(this.props)} />
        <MapButton onPress={this.setSignOut} />
        <HeartButton />
        <ImageBackground
          source={require('../../assets/images/homebackground.png')}
          resizeMethod="auto"
          style={styles.backgroundImageStyle} />

        <UserDetails photo={currentUser.photo} name={"Lourenço José Roberti de Araújo"} aliasName={this.getFirstLetterName("Lourenço José Roberti de Araújo")} />
        {/* <UserDetails photo={currentUser.photo} name={currentUser.name} aliasName={this.getFirstLetterName(currentUser.name)} /> */}

        <ScrollView style={{ height: "100%" }}>
          <View style={{ paddingVertical: 20 }}>
            <UserPersonalData age="21" cpf="123.132.123-00" rg="21.211.222-7" />
            {this.renderOptionsList()}
            <VersionDetails />
          </View>

        </ScrollView>


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
        <MenuItem icon="heart-pulse" name="MINHA SAÚDE" />
        <MenuItem icon="monitor" name="TELEORIENTAÇÃO" />
        <MenuItem icon="account" name="UTILIDADE PÚBLICA" />
        <MenuItem icon="settings" name="CONFIGURAÇÕES" />
        <MenuItem icon="logout" name="SAIR" />
      </View>
    );
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
    <TouchableOpacity onPress={onPress}>
      <Icon
        name="chevron-down"
        size={40}
        color={Colors.secondaryColor} />
    </TouchableOpacity>
  </View>
);

const UserPersonalData = ({ age, cpf, rg }) => (
  <View style={styles.userPersonalDataContainer}>
    <Text numberOfLines={1} style={styles.userPersonalDataText}><Text numberOfLines={1} style={styles.boldText}>Idade: </Text>{age}</Text>
    <Text numberOfLines={1} style={styles.userPersonalDataText}><Text numberOfLines={1} style={styles.boldText}>CPF: </Text>{cpf}</Text>
    <Text numberOfLines={1} style={styles.userPersonalDataText}><Text numberOfLines={1} style={styles.boldText}>RG: </Text>{rg}</Text>
  </View>
);

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.notMainText,
    height: '100%',
    paddingTop: 40,
    paddingHorizontal: 40
  },
  backgroundImageStyle: {
    flex: 1,
    width: 375,
    height: 250,
    position: "absolute",
    marginTop: 50
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
    alignItems: "center"
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
    paddingVertical: 10,
    maxWidth: "80%"
  },
  boldText: {
    fontWeight: "bold"
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#A7A7A7"
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
    paddingVertical: 2,
  },
  userPersonalDataContainer: {
    width: "100%",
    alignItems: "center"
  },
  versionContainer: {
    width: "100%",
    paddingTop: 15
  },
  versionText: {
    fontFamily: Colors.fontFamily,
    color: "#FFFFFF",
  },
});
