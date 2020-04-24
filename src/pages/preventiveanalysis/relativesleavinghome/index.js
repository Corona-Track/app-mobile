import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
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
import {
  RadioButtonTripleResizableItem,
  RadioButtonYesOrNoItem,
} from '../../../components/customcheckboxitem';

import {UserConsumer,UserContext} from '../../../store/user';

export default class RelativesLeavingHomePage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      relativesLeavingHome: null,
      howManyRelatives: null,
      relativesLeavingTimes: null,
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
              <ScrollView>
                <IntroText />
                <View style={styles.radioButtonItemContainer}>
                  <View style={{alignSelf: 'center', height: 70}}>
                    <RadioButtonYesOrNoItem
                      value={entity.relativesLeavingHome}
                      onPressCheckbox={this.onChangeRelativesLeavingHome}
                    />
                  </View>
                  <PeopleOutsideHome />
                  <View style={{height: 50, justifyContent: 'center'}}>
                    <RadioButtonTripleResizableItem
                      value={entity.howManyRelatives}
                      onPressCheckbox={this.onChangeHowManyRelatives}
                      firstTitle={'Uma'}
                      secondTitle={'Duas'}
                      thirdTitle={'Três ou mais'}
                    />
                  </View>
                  <TimesOutsideHome />
                  <View style={{height: 50}}>
                    <RadioButtonTripleResizableItem
                      value={entity.relativesLeavingTimes}
                      onPressCheckbox={this.onChangeRelativesLeavingTimes}
                      firstTitle={'Uma'}
                      secondTitle={'Duas'}
                      thirdTitle={'Três ou mais'}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                flex: 0.25,
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'flex-end',
                paddingBottom: 20,
              }}>
              <ContinueRequiredButton
                onPress={() => {
                  this.onContinueButtonClick(context);
                }}
                disabled={this.disableButton()}
              />
              {!entity.contaminated ? (
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
            <ProgressTracking amount={10} position={9} />
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
    this.props.navigation.navigate('RelativesHomePrecautions', {
      entity: entity,
    });
  };
  disableButton = () => {
    let {entity} = this.state;
    return !(
      entity.relativesLeavingHome !== null &&
      entity.howManyRelatives !== null &&
      entity.relativesLeavingTimes !== null
    );
  };
  onChangeRelativesLeavingHome = value => {
    let {entity} = this.state;
    entity.relativesLeavingHome = value;
    this.setState({entity});
  };
  onChangeHowManyRelatives = value => {
    let {entity} = this.state;
    entity.howManyRelatives = value;
    this.setState({entity});
  };
  onChangeRelativesLeavingTimes = value => {
    let {entity} = this.state;
    entity.relativesLeavingTimes = value;
    this.setState({entity});
  };
  onDoubtPress = context => {
    let {entity} = this.state;
    entity.relativesLeavingHome = null;
    entity.howManyRelatives = null;
    entity.relativesLeavingTimes = null;
    entity.skippedAnswer = true;
    this.setState({entity});
    context.updateUser({question: entity});
    this.props.navigation.navigate('RelativesHomePrecautions', {
      entity: entity,
    });
  };
}

RelativesLeavingHomePage.contextType = UserContext;

const PeopleOutsideHome = () => (
  <View style={[styles.textContainer, {marginTop: 20}]}>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      Quantas pessoas saem de casa?
    </Text>
  </View>
);

const TimesOutsideHome = () => (
  <View style={[styles.textContainer, {marginTop: 20}]}>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      Quantas vezes saem
    </Text>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      de cada por semana?
    </Text>
  </View>
);

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>Você mora com pessoas que</Text>
    <Text style={[styles.simpleText]}>
      <Text style={styles.boldText}>saem de casa</Text> durante
    </Text>
    <Text style={[styles.simpleText]}>a pandemia?</Text>
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
        marginBottom: 20,
      },
      android: {
        marginTop: 20,
        marginBottom: 20,
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
  continueButtonContainer: {
    width: '100%',
    borderRadius: 50,
  },
  continueButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  continueButtonText: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
  },
  skipButtonContainer: {
    width: '100%',
    borderRadius: 50,
  },
  skipButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  skipButtonText: {
    fontFamily: Colors.fontFamily,
  },
  skipContainer: {
    marginTop: 5,
  },
  photoIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  radioButtonItemContainer: {},
});
