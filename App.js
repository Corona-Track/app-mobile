import 'react-native-get-random-values';
import { createAppContainer } from 'react-navigation';
import React, { useState } from 'react';
import { YellowBox, View, SafeAreaView, StyleSheet } from 'react-native';
import Routes from './src/routes';
import createStoreProvider from './src/store/createStoreProvider';
import { UserProvider } from './src/store/user';
import { SymptomProvider } from './src/store/symptom';

const AppContainer = createAppContainer(Routes);

YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['']);

const StoreProvider = createStoreProvider([UserProvider, SymptomProvider]);

export default class App extends React.Component {
  render = () => (
    <View style={styles.appContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <StoreProvider>
          <AppContainer />
        </StoreProvider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#828282'
  },
  safeAreaContainer: {
    height: "100%"
  }
});