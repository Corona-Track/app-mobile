import {createAppContainer} from 'react-navigation';
import React from 'react';
import Routes from './src/routes';
const AppContainer = createAppContainer(Routes);

export default class App extends React.Component {
  render = () => <AppContainer />;
}
