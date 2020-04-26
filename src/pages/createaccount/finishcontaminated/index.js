import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
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
  ContaminatedAnswerNowButton,
  ContaminatedAnswerLaterButton,
} from '../../../components/custombutton';
import {getFirstName} from '../../../services/formvalidatorservice';

import {UserConsumer} from '../../../store/user';

export default class FinishContaminatedPage extends Component {
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
              <View style={{flex: 0.25, width: '90%'}}>
                <ContaminatedAnswerNowButton
                  onPress={() => {
                    this.onAnswerNowButtonPress();
                  }}
                />
                <ContaminatedAnswerLaterButton
                  onPress={() => {
                    this.onAnswerLaterButtonPress();
                  }}
                />
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

  onAnswerLaterButtonPress = () => {
    this.props.navigation.navigate('Application');
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
      <Text style={[styles.simpleText]}>É muito importante sabermos,</Text>
      <Text style={[styles.simpleText]}>também, como foram seus hábitos</Text>
      <Text style={[styles.simpleText]}>durante a pandemia do Coronavírus</Text>
      <Text style={[styles.simpleText]}>antes de ter contraído a doença.</Text>
      <Text style={[styles.simpleText]}>Por isso, temos mais algumas</Text>
      <Text style={[styles.simpleText]}>perguntas, você se importaria em</Text>
      <Text style={[styles.simpleText]}>responder? Você ajudará outras</Text>
      <Text style={[styles.simpleText]}>
        pessoas a não contraírem a doença.
      </Text>
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
    backgroundColor: Colors.redRiskProfile,
    height: '100%',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  textContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
    }),
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
    marginVertical: 20,
    ...Platform.select({
      ios: {
        paddingTop: 60,
      },
      android: {
        paddingTop: 30,
      },
    }),
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
