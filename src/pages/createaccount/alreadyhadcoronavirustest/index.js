import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Header} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {Colors} from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import {
  LeftComponent,
  CenterComponent,
  RightComponent,
} from '../../../components/customheader';
import PropTypes from 'prop-types';
import {
  ConfirmButton,
  DenyButton,
  DoubtButton,
} from '../../../components/custombutton';
import {NavigationEvents} from 'react-navigation';
import {ImageIcon} from '../../../components/customimageicon';

import {UserConsumer} from '../../../store/user';

export default class AlreadyHadCoronavirusTestPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  static propTypes = {
    entity: PropTypes.object,
  };

  state = {
    entity: {
      alreadyHadCoronavirusTest: '',
    },
  };

  render = () => {
    let {entity} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <Header
            backgroundColor={Colors.secondaryColor}
            leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
            centerComponent={
              <CenterComponent photo={entity.photo} userName={entity.name} />
            }
            rightComponent={
              <RightComponent onPress={this.onRightButtonPress} />
            }
          />
        </View>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <IntroText />
          <View style={styles.avatarContainer}>
            <ImageIcon source={require('../../../assets/images/virus.png')} />
          </View>
        </View>
        <UserConsumer>
          {context => (
            <View style={{flex: 0.4, width: '100%', paddingHorizontal: 20}}>
              <DenyButton
                onPress={() => {
                  this.onAnswerButtonPress('deny', context);
                }}
              />
              <ConfirmButton
                onPress={() => {
                  this.onAnswerButtonPress('confirm', context);
                }}
              />
            </View>
          )}
        </UserConsumer>
        <ProgressTracking amount={7} position={4} />
      </SafeAreaView>
    );
  };
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };
  onRightButtonPress = () => {
    this.props.navigation.pop();
  };
  onAnswerButtonPress = (answer, context) => {
    let {entity} = this.state;
    entity.alreadyHadCoronavirusTest = answer;
    this.setState({entity});
    context.updateUser({question: entity});
    this.props.navigation.navigate('TestResult', {entity: entity});
  };
}

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>Você realizou o</Text>
    <Text style={[styles.simpleText]}>
      <Text style={styles.boldText}>teste para Coronavírus?</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
    height: '100%',
    paddingBottom: 15,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  simpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
});
