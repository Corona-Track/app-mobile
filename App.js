import 'react-native-get-random-values';
import {createAppContainer} from 'react-navigation';
import React, {useState} from 'react';
import {YellowBox} from 'react-native';
import Routes from './src/routes';
import createStoreProvider from './src/store/createStoreProvider';
import {UserProvider} from './src/store/user';
import {SymptomProvider} from './src/store/symptom';

const AppContainer = createAppContainer(Routes);

YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['']);

const StoreProvider = createStoreProvider([UserProvider, SymptomProvider]);

export default class App extends React.Component {
  render = () => (
    <StoreProvider>
      <AppContainer />
    </StoreProvider>
  );
}
