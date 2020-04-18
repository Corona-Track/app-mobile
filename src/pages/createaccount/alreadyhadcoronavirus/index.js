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

export default class AlreadyHadCoronavirusPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  static propTypes = {
    entity: PropTypes.object,
  };
  
  state = {
    entity: {
      alreadyHadCoronavirus: '',
      contaminated: false,
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
              <DoubtButton
                onPress={() => {
                  this.onAnswerButtonPress('doubt', context);
                }}
                label="Não tenho certeza"
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
    entity.alreadyHadCoronavirus = answer;
    entity.contaminated = false;
    let nextPage = 'SomeoneDiagnosed';
    if (answer === 'confirm') {
      nextPage = 'AlreadyHadCoronavirusTest';
      entity.contaminated = true;
    }
    context.updateUser({question: entity});
    this.setState({entity});
    this.props.navigation.navigate(nextPage, {entity: entity});
  };
}

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>
      <Text style={styles.boldText}>Você já teve Coronavírus</Text>
    </Text>
    <Text style={[styles.simpleText]}>confirmado por teste?</Text>
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
