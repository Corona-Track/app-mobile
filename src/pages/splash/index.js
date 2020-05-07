import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../themes/variables';

function Splash({navigation}) {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Application');
      } else {
        navigation.navigate('Disclaimer');
      }
    });
    return unsubscribe; // unsubscribe on unmount
  }, [navigation]);

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
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
    height: '100%',
  },
  logo: {
    height: 150,
    width: 210,
  },
});

export default Splash;
