import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationActions, StackActions, SwitchActions} from 'react-navigation';
import {Colors} from '../../themes/variables';

import {getUser} from '../../firebase/Auth';

export default class SplashPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {};
  componentDidMount() {
    //Verify user session
    getUser()
      .then(() => {
        this.props.navigation.dispatch(
          SwitchActions.jumpTo({routeName: 'Application'}),
        );
      })
      .catch(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Login'})],
        });
        this.props.navigation.dispatch(resetAction);
      });
  }
  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/images/logo.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
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
