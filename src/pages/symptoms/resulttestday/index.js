import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, Alert} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
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
import {SaveSymptom} from '../../../firebase/Symptom';

export default class ResultTestDay extends Component {
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
    loading: false,
  };

  render = () => {
    let {entity, showTestDate, loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} />
        <View style={{flex: 0.75, width: '100%'}}>
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
                <Text style={styles.boldText}>Quando realizou o teste?</Text>
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
            onPress={() => this.testButtonPress()}
            disabled={this.disableButton()}
          />
        </View>
      </SafeAreaView>
    );
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
    entity.testDate = date;
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
  testButtonPress = async () => {
    let {entity} = this.state;
    this.props.contextSymptom.updateSymptom({
      testDate: entity.testDate,
      testResult: entity.testResult,
    });
    this.props.navigation.navigation.navigate('SymptomsTest', {
      testDate: entity.testDate,
      testResult: entity.testResult,
    });
  };
}

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
