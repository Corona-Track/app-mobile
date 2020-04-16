import {createAppContainer} from 'react-navigation';
import React from 'react';
import {YellowBox} from 'react-native';
import Routes from './src/routes';
const AppContainer = createAppContainer(Routes);

YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['']);

export default class App extends React.Component {
  render = () => <AppContainer />;
}
