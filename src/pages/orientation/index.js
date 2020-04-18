/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, ActivityIndicator, TouchableHighlight} from 'react-native';
import {NavigationActions, StackActions, SwitchActions} from 'react-navigation';
import {Colors} from '../../themes/variables';
import {signOut} from '../../firebase/Auth';
import { Header } from 'react-native-elements';
import { LeftComponent, CenterComponent, RightComponent } from '../../components/customheader';
import PropTypes from 'prop-types';

import {TextInput, Button} from 'react-native-paper';

export default class OrientationPage extends Component {
  
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
      entity: PropTypes.object,
  }
  state = {
      entity: {
          hadFluVaccine: null,
      },
  };
  initialize(props) {
      if (!props)
          return;
      let { navigation } = props;
      let { entity } = this.state;
      let previousEntity = navigation.getParam('entity', null);
      if (!previousEntity)
          return;
      let converted = {
          ...entity,
          ...previousEntity
      };
      this.setState({ entity: converted });
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

  onPressScheduleOrientation(props){
    props.navigation.navigate("ScheduleOrientation");
  }
  componentDidMount() {}
  render = () => {
    let { entity } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
            backgroundColor={Colors.primaryTextColor}
            leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
            centerComponent={<CenterComponent photo={null} userName={null} />}
            rightComponent={<RightComponent onPress={this.onRightButtonPress} />} />
        <Text style={styles.title}>Teleorientação</Text>
        <Image
          style={styles.imageMain}
          resizeMode="contain"
          source={require('../../assets/images/orientation.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.desc}>Você será direcionado para o aplicativo da nossa parceira Aliança Médica.
        Eles farão parte do agendamento de teleorientação com um médico voluntário e avisarão quando estiver disponível.
        </Text>
        <Button
          style={styles.buttonOrin}
          contentStyle={styles.containerButton}
          mode="outlined"
          color={Colors.primaryTextColor}
          labelStyle={styles.textOrin}
          onPress={() => this.onPressScheduleOrientation(this.props)}>
          AGENDAR TELEORIENTAÇÃO
        </Button>
        <Button
          style={styles.buttoBack}
          contentStyle={styles.containerButton}
          mode="outlined"
          color={Colors.buttonPrimaryColor}
          labelStyle={styles.textOrin}
          onPress={this.onSignUpButtonPress}>
          VOLTAR
        </Button>
        <Text onPress={() => this.setSignOut()}>Sair</Text>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: '100%',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Colors.fontFamily,
    color: Colors.primaryBlack
  },
  logo: {
    height: 150,
    width: 210,
  },
  imageMain: {
    height: 203,
    width: 254,
  },
  desc : {
    fontSize: 16,
    lineHeight: 20,
    width: '70%',
    fontFamily: Colors.fontFamily,
    textAlign: 'center',
    color: Colors.notMainText
  },
  buttonOrin: {
    marginTop: 30, 
    height: 50, 
    borderRadius: 50, 
    backgroundColor: Colors.buttonPrimaryColor, 
    width: '90%',
  },  
  containerButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  buttoBack : {
    marginTop: 15, 
    height: 50, 
    borderRadius: 50, 
    width: '90%',
    borderWidth: 1,
    borderColor: Colors.buttonPrimaryColor,
    marginBottom: 10
  },
  textOrin : {
    fontFamily: Colors.fontFamily,
    fontSize: 16
  }, 
});
