import React, {useEffect} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';

function AuthLoading({navigation}) {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Application');
      } else {
        navigation.navigate('Authentication');
      }
    });
    return unsubscribe; // unsubscribe on unmount
  }, [navigation]);

  return <View />;
}

export default AuthLoading;
