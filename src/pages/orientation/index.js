/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Colors } from '../../themes/variables';
import { signOut } from '../../firebase/Auth';
import { Header } from 'react-native-elements';
import { LeftComponent, CenterComponent, RightComponent } from '../../components/customheader';
import PropTypes from 'prop-types';

import { TextInput, Button } from 'react-native-paper';
import { getUser } from '../../firebase/User';

export default class OrientationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entity: {
        name: '',
        photo: null
      },
    };
  }
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  }

  onPressScheduleOrientation(props) {
    props.navigation.navigate("ScheduleOrientation");
  }
  componentDidMount() {
    getUser().then(doc => {
      const { name, photo } = doc.data();
      this.setState({
        entity: {
          name,
          photo
        }
      });
    }).catch(err => { console.log('Error getting document', err); });
  }
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  }
  render = () => {
    let { entity } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ width: '100%', marginHorizontal: 20 }}>
          <Header
            backgroundColor={Colors.secondaryColor}
            leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
            centerComponent={<CenterComponent photo={entity.photo} userName={entity.name} />} />
        </View>
        <View style={styles.content}>
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
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttonOrin}
              mode="contained"
              color={Colors.buttonPrimaryColor}
              labelStyle={styles.textOrin}
              onPress={() => this.onPressScheduleOrientation(this.props)}
            >AGENDAR TELEORIENTAÇÃO</Button>
            {/* 
            <Button
              style={styles.buttoBack}
              mode="contained"
              color={'#FFFFFF'}
              labelStyle={styles.buttoBackText}
            >VOLTAR PARA O INÍCIO</Button> */}
          </View>
        </View>

      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: Colors.secondaryColor,
    // height: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  desc: {
    fontSize: 16,
    lineHeight: 20,
    width: '70%',
    fontFamily: Colors.fontFamily,
    textAlign: 'center',
    color: Colors.notMainText
  },


  buttonOrin: {
    width: '100%',
    marginTop: 30,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',

  },
  textOrin: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
  },
  buttoBack: {
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    borderColor: Colors.buttonPrimaryColor,
    borderWidth: 1,

  },
  buttoBackText: {
    color: Colors.buttonPrimaryColor,
    fontFamily: Colors.fontFamily,

  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20
  },
});
