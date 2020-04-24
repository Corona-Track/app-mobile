import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, Platform} from 'react-native';
import {Header} from 'react-native-elements';
import PropTypes from 'prop-types';

import {Colors} from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import {
  LeftComponent,
  CenterComponent,
  RightComponent,
} from '../../../components/customheader';
import {
  ContinueRequiredButton,
  DoubtButton,
} from '../../../components/custombutton';
import {RadioButtonYesOrNoItem} from '../../../components/customcheckboxitem';

import {UserConsumer,UserContext} from '../../../store/user';

export default class AlreadyHadFluVaccinePage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      hadFluVaccine: null,
    },
  };

  componentDidMount() {
    let { user } = this.context;

    if(this.props.navigation.state.params.edit){
      this.setState({
        entity: user.question
      })
    }
  }

  render = () => {
    let {entity} = this.state;
    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <View style={{flex: 0.75, width: '100%'}}>
              <View style={{width: '100%', paddingHorizontal: 20}}>
                <Header
                  backgroundColor={Colors.secondaryColor}
                  leftComponent={
                    <LeftComponent onPress={this.onLeftButtonPress} />
                  }
                  centerComponent={
                    <CenterComponent
                      photo={context.user.photo}
                      userName={context.user.name}
                    />
                  }
                  rightComponent={
                    <RightComponent onPress={this.onRightButtonPress} />
                  }
                />
              </View>
              <IntroText />
              <View style={{alignSelf: 'center', height: 70}}>
                <RadioButtonYesOrNoItem
                  noTitle="Ainda NÃO"
                  value={entity.hadFluVaccine}
                  onPressCheckbox={this.onPressCheckbox}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.25,
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'flex-end',
                paddingVertical: 20,
              }}>
              <ContinueRequiredButton
                onPress={() => {
                  this.onContinueButtonClick(context);
                }}
                disabled={this.disableButton()}
              />
              {!context.user.question.contaminated ? (
                <DoubtButton
                  onPress={() => {
                    this.onDoubtPress(context);
                  }}
                  label="Responder depois"
                />
              ) : (
                <></>
              )}
            </View>
            <ProgressTracking amount={10} position={2} />
          </SafeAreaView>
        )}
      </UserConsumer>
    );
  };
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };
  onRightButtonPress = () => {
    this.props.navigation.pop();
  };
  onContinueButtonClick = context => {
    let {entity} = this.state;
    context.updateUser({question: entity});
    this.props.navigation.navigate('WeekLeaveHomeTimes', {entity: entity});
  };
  onPressCheckbox = value => {
    let {entity} = this.state;
    entity.hadFluVaccine = value;
    this.setState({entity});
  };
  disableButton = () => {
    let {entity} = this.state;
    return !(entity.hadFluVaccine !== null);
  };
  onDoubtPress = context => {
    let {entity} = this.state;
    entity.hadFluVaccine = null;
    entity.skippedAnswer = true;
    this.setState({entity});
    context.updateUser({question: entity});
    this.props.navigation.navigate('WeekLeaveHomeTimes', {entity: entity});
  };
}

AlreadyHadFluVaccinePage.contextType = UserContext;

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>
      Você já tomou a <Text style={styles.boldText}>vacina</Text>
    </Text>
    <Text style={[styles.simpleText]}>
      <Text style={styles.boldText}>da gripe</Text> de 2020?
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
    ...Platform.select({
      ios: {
        marginTop: 25,
      },
      android: {
        marginTop: 20,
      },
    }),
  },
  simpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 30,
  },
  skipContainer: {
    marginTop: 5,
  },
});
