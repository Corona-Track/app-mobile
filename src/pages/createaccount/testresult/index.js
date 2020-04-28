import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Header} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import PropTypes from 'prop-types';

import {Colors} from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import {
  LeftComponent,
  CenterComponent,
  RightComponent,
} from '../../../components/customheader';
import {ContinueRequiredButton} from '../../../components/custombutton';
import {RadioButtonYesOrNoItem} from '../../../components/customcheckboxitem';
import {SimpleCenterDateTextInput} from '../../../components/customtextinput';

import {UserConsumer,UserContext} from '../../../store/user';

export default class TestResultPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  static propTypes = {
    entity: PropTypes.object,
  };

  state = {
    entity: {
      testResult: '',
      testDate: null,
    },
    showTestDate: false,
  };

  componentDidMount() {
    let {navigation} = this.props;
    if(navigation.state.params && navigation.state.params.edit){
      let { user } = this.context;
    
      this.setState({ entity: user.question })
    }
  }

  render = () => {
    let {entity, showTestDate} = this.state;
    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <View style={{flex: 0.75, width: '100%'}}>
              <View style={{width: '100%', paddingHorizontal: 25}}>
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
                  value={entity.testResult}
                  onPressCheckbox={this.onPressCheckbox}
                />
              </View>
              {entity.testResult ? (
                <View
                  style={{
                    backgroundColor: Colors.searchBackgroundColor,
                    width: '100%',
                    paddingHorizontal: 25,
                    paddingVertical: 35,
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: Colors.fontFamily,
                      color: '#828282',
                      fontSize: 16,
                    }}>
                    <Text style={styles.boldText}>
                      Quando realizou o teste?
                    </Text>
                  </Text>
                  <SimpleCenterDateTextInput
                    label="Selecione"
                    value={entity.testDate}
                    onPress={this.onPressTestDatePicker}
                    showDatePicker={showTestDate}
                    onChangeDate={this.onHandleDate}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
            <View
              style={{
                flex: 0.25,
                width: '100%',
                paddingHorizontal: 20,
                paddingVertical: 20,
                justifyContent: 'flex-end',
              }}>
              <ContinueRequiredButton
                onPress={() => {
                  this.onContinuePress(context);
                }}
                disabled={this.disableButton()}
              />
            </View>
            <ProgressTracking amount={7} position={4} />
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
  onContinuePress = context => {
    let {entity} = this.state;

    if(entity.testResult === false){
      context.updateUser({question: {
        testResult: entity.testResult,
        testDate: entity.testDate,
        alreadyHadCoronavirus: "deny",
        contaminated: false
      }});
    }else if(entity.testDate){
      context.updateUser({question: {
        testResult: entity.testResult,
        testDate: entity.testDate,
        alreadyHadCoronavirus: "deny",
        contaminated: true,
      }});
    }

    this.props.navigation.navigate('Comorbidities', {entity: entity});
  };
  onPressCheckbox = value => {
    let {entity} = this.state;
    entity.testResult = value;
    entity.testDate = null;
    this.setState({entity});
  };
  onPressTestDatePicker = () => {
    this.setState({showTestDate: true});
  };
  onHandleDate = (event, date) => {
    let {entity} = this.state;
    entity.testDate = date ?? entity.testDate;
    this.setState({
      entity: entity,
      showTestDate: false,
    });
  };
  disableButton = () => {
    let {entity} = this.state;
    return !(
      (entity.testResult === true && entity.testDate) ||
      entity.testResult === false
    );
  };
}

TestResultPage.contextType = UserContext;

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>
      O seu teste <Text style={styles.boldText}>foi positivo?</Text>
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
