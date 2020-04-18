import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationActions, StackActions, SwitchActions} from 'react-navigation';
import {Colors} from '../../themes/variables';

import {signOut} from '../../firebase/Auth';

export default class HomePage extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {};
  setSignOut = () => {
    signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
  };

  onSymptomsButtonPress = () => {
        console.log("Symptoms");
        this.props.navigation.navigate("Symptoms");
   };

  componentDidMount() {}
  render = () => {
    return (
      <SafeAreaView style={styles.container}>
<<<<<<< HEAD
        <Text>Home</Text>
        <Text onPress={() => this.onSymptomsButtonPress()}>Sintomas</Text>
=======
        <Text>Home2</Text>
>>>>>>> 1cbd9a7e17940c7f353b4c90f29e33114cc7571d
        <Text onPress={() => this.setSignOut()}>Sair</Text>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
    height: '100%',
    marginHorizontal: 20,
  },
  logo: {
    height: 150,
    width: 210,
  },
});
