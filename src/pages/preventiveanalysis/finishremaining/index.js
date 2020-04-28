import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import PropTypes from 'prop-types';
import {ProgressBar} from 'react-native-paper';

import {Colors} from '../../../themes/variables';
import {FinishRemainingButton} from '../../../components/custombutton';
import {getFirstName} from '../../../services/formvalidatorservice';
import {UserConsumer} from '../../../store/user';

export default class FinishRemainingPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {},
  };

  render = () => {
    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
                paddingTop: 60,
              }}>
              {context.user.photo ? (
                <View style={styles.avatarContainer}>
                  <Avatar
                    size={125}
                    rounded
                    overlayContainerStyle={styles.avatarContainerIcon}
                    source={{uri: context.user.photo}}
                  />
                </View>
              ) : (
                <></>
              )}
              <IntroText userName={context.user.name} />
              <View style={{margin: 20, padding: 20}}>
                <ProgressBar progress={0.75} color={Colors.greenLight} />
                <Text
                  style={[
                    styles.simpleText,
                    {fontSize: 14, textAlign: 'center', marginTop: 10},
                  ]}>
                  Preenchimento do seu perfil 75%
                </Text>
              </View>
            </View>
            <View style={{flex: 0.2, width: '90%'}}>
              <FinishRemainingButton
                onPress={() => {
                  this.onFinishRemainingPress(context);
                }}
              />
            </View>
          </SafeAreaView>
        )}
      </UserConsumer>
    );
  };
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };
  onFinishRemainingPress = async context => {
    this.props.navigation.navigate('Application');
  };
}

const IntroText = ({userName}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={[styles.simpleText, {marginVertical: 20}]}>
        <Text style={[styles.boldText, {fontSize: 28}]}>
          Obrigado {getFirstName(userName)}!
        </Text>
      </Text>
      <Text style={[styles.simpleText]}>Você não concluiu</Text>
      <Text style={[styles.simpleText]}>por completo seu cadastro</Text>
      <Text style={[styles.simpleText]}>seria importante retornar depois</Text>
      <Text style={[styles.simpleText]}>ao seu perfil para finalizá-lo.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    height: '100%',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  simpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 18,
    color: Colors.primaryTextColor,
  },
  boldText: {
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginVertical: 20,
  },
  rightComponent: {
    flex: 0,
    position: 'absolute',
    right: 30,
    top: 35,
  },
  avatarContainerIcon: {
    backgroundColor: Colors.secondaryColor,
    borderColor: Colors.secondaryColor,
    borderWidth: 3,
  },
});
