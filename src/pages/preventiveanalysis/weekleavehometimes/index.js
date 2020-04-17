import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';
import {Header, Slider} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
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
import {RadioButtonItem} from '../../../components/customcheckboxitem';

import {UserConsumer} from '../../../store/user';

export default class WeekLeaveHomeTimesPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      daysAWeek: 1,
      reasonToLeaveHome: null,
    },
    reasonsList: [
      {identifier: 'Trabalhar'},
      {identifier: 'Comprar remédios ou alimentos'},
      {identifier: 'Outros motivos'},
    ],
  };

  render = () => {
    let {entity, reasonsList} = this.state;
    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <View style={{flex: 0.8, width: '100%'}}>
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
                <SliderText />
                <CustomSlider
                  value={entity.daysAWeek}
                  onValueChange={this.onChangeSlider}
                />
                <SecondaryText />
                <View style={styles.radioButtonItemContainer}>
                  {reasonsList.map(reason => {
                    return (
                      <View
                        style={{
                          marginVertical: 2,
                          height: 40,
                          paddingHorizontal: 20,
                        }}>
                        <RadioButtonItem
                          identifier={reason.identifier}
                          isChecked={this.isChecked}
                          onClickCheck={this.onClickCheck}
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                flex: 0.2,
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
            <ProgressTracking amount={10} position={3} />
          </SafeAreaView>
        )}
      </UserConsumer>
    );
  };
  onHandleDaysAWeek = daysAWeek => {
    let {entity} = this.state;
    entity.daysAWeek = daysAWeek;
    this.setState({entity});
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
    this.props.navigation.navigate('SocialDistance', {entity: entity});
  };
  disableButton = () => {
    let {entity} = this.state;
    return !entity.reasonToLeaveHome;
  };
  onChangeSlider = value => {
    let {entity} = this.state;
    entity.daysAWeek = value;
    this.setState({entity});
  };
  isChecked = identifier => {
    let {entity} = this.state;
    return entity.reasonToLeaveHome && entity.reasonToLeaveHome === identifier;
  };
  onClickCheck = identifier => {
    let {entity} = this.state;
    entity.reasonToLeaveHome = identifier;
    this.setState({entity});
  };
  onDoubtPress = context => {
    let {entity} = this.state;
    entity.daysAWeek = null;
    entity.reasonToLeaveHome = null;
    entity.skippedAnswer = true;
    this.setState({entity});
    context.updateUser({question: entity});
    this.props.navigation.navigate('SocialDistance', {entity: entity});
  };
}

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>Quantas vezes por semana</Text>
    <Text style={[styles.simpleText]}>
      você <Text style={styles.boldText}>sai de casa?</Text>
    </Text>
  </View>
);

const SecondaryText = () => (
  <View style={[styles.textContainer, {paddingTop: 20}]}>
    <Text style={[styles.simpleText]}>Principal motivo</Text>
    <Text style={[styles.simpleText]}>para sair de casa:</Text>
  </View>
);

const SliderText = () => (
  <View style={[styles.textContainer, {paddingTop: 20}]}>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 16, color: Colors.placeholderTextColor},
      ]}>
      Número de dias da semana:
    </Text>
  </View>
);

const CustomSlider = ({value, onValueChange}) => {
  return (
    <View style={{paddingHorizontal: 40, height: 50, flexDirection: 'column'}}>
      <Slider
        value={value}
        onValueChange={onValueChange}
        step={1}
        minimumValue={1}
        maximumValue={7}
        minimumTrackTintColor={Colors.navigatorIconColor}
        maximumTrackTintColor={Colors.searchIconColor}
        animationType="spring"
        thumbTintColor={Colors.secondaryColor}
        thumbStyle={styles.customThumbStyle}
      />
      <View style={styles.detailsLineContainer}>
        <Text
          style={[
            styles.sliderSimpleText,
            {flex: 0, position: 'absolute', left: 3},
          ]}>
          {' '}
          1
        </Text>
        <View style={styles.underlineThumb}>
          <Text style={styles.centerValue}>{value}</Text>
        </View>
        <Text
          style={[
            styles.sliderSimpleText,
            {flex: 0, position: 'absolute', right: 7},
          ]}>
          {' '}
          7
        </Text>
      </View>
    </View>
  );
};

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
    marginTop: 5,
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
  sliderSimpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 18,
    color: Colors.placeholderTextColor,
  },
  customThumbStyle: {
    borderWidth: 6,
    borderColor: Colors.navigatorIconColor,
    width: 25,
    height: 25,
    borderRadius: 12,
  },
  underlineThumb: {
    width: 35,
    height: 25,
    backgroundColor: Colors.navigatorIconColor,
    borderRadius: 5,
  },
  detailsLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  centerValue: {
    fontFamily: Colors.fontFamily,
    fontSize: 18,
    color: Colors.primaryTextColor,
    textAlign: 'center',
  },
  radioButtonItemContainer: {
    marginVertical: 10,
    paddingLeft: 3,
  },
});
