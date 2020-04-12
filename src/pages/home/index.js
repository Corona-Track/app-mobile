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
        alert(error);
      });
  };
  componentDidMount() {}
  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Home</Text>
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
