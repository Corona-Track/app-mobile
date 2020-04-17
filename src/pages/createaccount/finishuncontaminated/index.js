import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {
  NavigationEvents,
  StackActions,
  NavigationActions,
} from 'react-navigation';

import {Colors} from '../../../themes/variables';
import {
  UncontaminatedAnswerNowButton,
  UncontaminatedAnswerLaterButton,
} from '../../../components/custombutton';
import {getFirstName} from '../../../services/formvalidatorservice';

import {UserConsumer} from '../../../store/user';

export default class FinishUncontaminatedPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        <CloseButton onPress={() => {}} />
        <UserConsumer>
          {context => (
            <>
              <View
                style={{
                  flex: 0.75,
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
              </View>
              <View style={{flex: 0.25, width: '100%'}}>
                <UncontaminatedAnswerNowButton
                  onPress={() => {
                    this.onAnswerNowButtonPress();
                  }}
                />
                <UncontaminatedAnswerLaterButton onPress={() => {}} />
              </View>
            </>
          )}
        </UserConsumer>
      </SafeAreaView>
    );
  };

  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };

  onAnswerNowButtonPress = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Medicines',
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };
}

const IntroText = ({userName}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={[styles.simpleText, {marginVertical: 20}]}>
        <Text style={[styles.boldText, {fontSize: 28}]}>
          Excelente, {getFirstName(userName)}
        </Text>
      </Text>
      <Text style={[styles.simpleText]}>É muito importante</Text>
      <Text style={[styles.simpleText]}>sabermos, também, como</Text>
      <Text style={[styles.simpleText]}>estão seus hábitos durante</Text>
      <Text style={[styles.simpleText]}>a pandemia do Coronavírus</Text>
      <Text style={[styles.simpleText]}>Por isso temos mais algumas</Text>
      <Text style={[styles.simpleText]}>perguntas, você se</Text>
      <Text style={[styles.simpleText]}>importaria em responder?</Text>
    </View>
  );
};

const CloseButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.rightComponent} onPress={onPress}>
      <Icon name="close" size={32} color={Colors.secondaryColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonPrimaryColor,
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
    color: Colors.secondaryColor,
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
