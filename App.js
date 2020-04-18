import 'react-native-get-random-values';
import {createAppContainer} from 'react-navigation';
import React, {useState} from 'react';
import {YellowBox} from 'react-native';
import Routes from './src/routes';
import createStoreProvider from './src/store/createStoreProvider';
import {UserProvider} from './src/store/user';

const AppContainer = createAppContainer(Routes);

YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['']);

const StoreProvider = createStoreProvider([UserProvider]);

export default class App extends React.Component {
  render = () => (
    <StoreProvider>
      <AppContainer />
    </StoreProvider>
  );
}
