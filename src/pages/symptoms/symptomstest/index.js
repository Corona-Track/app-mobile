import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {Header} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import {Colors} from '../../../themes/variables';

import {LeftComponent, CenterComponent} from '../../../components/customheader';
import CustomHiddenView from '../../../components/customhiddenview';
import {ContinueRequiredButton} from '../../../components/custombutton';
import {
  CheckboxItemWithExpand,
  RadioButtonYesOrNoItem,
} from '../../../components/customcheckboxitem';

import {SymptomConsumer} from '../../../store/symptom';
import {UserConsumer} from '../../../store/user';
import {SaveSymptom} from '../../../firebase/Symptom';

export default class SymptomsTestPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      symptonsSelected: [],
      showSymptons: null,
      testDate: this.props.navigation.state.params.testDate,
      testResult: this.props.navigation.state.params.testResult,
      symptonsList: [
        {
          identifier: 'Falta de Ar',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Tonturas',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Desmaio',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {identifier: 'Febre', check: false, check2: false, start: '', end: ''},
        {
          identifier: 'Falta de apetite',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Produção de catarro',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Confusão',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Cansaço',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {identifier: 'Tosse', check: false, check2: false, start: '', end: ''},
        {
          identifier: 'Dor de Garganta',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {identifier: 'Fadiga', check: false, check2: false, start: '', end: ''},
        {
          identifier: 'Dor no Corpo',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Dor de Cabeça',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Dor no Peito',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Tosse com sangue',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Náusea ou vômito',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Dor de barriga',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Diarréia',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Olhos vermelhos',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
        {
          identifier: 'Não tive sintomas',
          check: false,
          check2: false,
          start: '',
          end: '',
        },
      ],
    },
    continueNoSymptons: false,
    showLoading: false,
  };

  render = () => {
    let {entity, showLoading} = this.state;
    return (
      <UserConsumer>
        {context => (
          <SymptomConsumer>
            {contextSymptom => (
              <SafeAreaView style={styles.container}>
                <Spinner visible={showLoading} />
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
                  />
                </View>
                <IntroText />
                <ScrollView>
                  <View style={styles.middle}>
                    <View style={styles.RadioButtonMiddle}>
                      <RadioButtonYesOrNoItem
                        value={entity.showSymptons}
                        onPressCheckbox={this.onPressCheckBox}
                      />
                    </View>
                  </View>
                  {entity.showSymptons === true ? (
                    <WhatFelling />
                  ) : (
                    entity.showSymptons === false && <HaveSymptoms />
                  )}
                  <View style={styles.bottom}>
                    <CustomHiddenView
                      show={
                        entity.showSymptons || entity.showSymptons === false
                      }>
                      <View style={styles.checkboxItemContainer}>
                        {entity.symptonsList.map((symptons, idx) => {
                          return (
                            <View
                              key={idx}
                              style={{minHeight: 40, height: 'auto'}}>
                              <CheckboxItemWithExpand
                                identifier={symptons.identifier}
                                isChecked={symptons.check}
                                onClickCheck={() =>
                                  symptons.identifier === 'Não tive sintomas'
                                    ? this.onClickNoneOfOptions(symptons)
                                    : this.onClickCheck(symptons, 'box')
                                }
                                onPressExpand={() => {
                                  if (
                                    symptons.identifier === 'Não tive sintomas'
                                  ) {
                                    this.onClickNoneOfOptions(symptons);
                                  } else {
                                    this.onClickCheck(symptons, 'arrow');
                                  }
                                }}
                              />
                              {symptons.check2 && (
                                <View style={styles.dateContainer}>
                                  <Text
                                    style={{
                                      marginTop: 10,
                                      textAlign: 'center',
                                      fontSize: 18,
                                      fontWeight: '500',
                                      color: '#828282',
                                    }}>
                                    Desde Quando?
                                  </Text>
                                  <CalendarPicker
                                    minDate={moment().subtract(14, 'days')}
                                    maxDate={new Date()}
                                    startFromMonday={true}
                                    allowRangeSelection={true}
                                    selectedDayTextColor={'white'}
                                    weekdays={[
                                      'S',
                                      'T',
                                      'Q',
                                      'Q',
                                      'S',
                                      'S',
                                      'D',
                                    ]}
                                    months={[
                                      'Janeiro',
                                      'Fevereiro',
                                      'Março',
                                      'Abril',
                                      'Maio',
                                      'Junho',
                                      'Julho',
                                      'Agosto',
                                      'Setembro',
                                      'Outubro',
                                      'Novembro',
                                      'Dezembro',
                                    ]}
                                    previousTitle="Anterior"
                                    nextTitle="Proximo"
                                    todayBackgroundColor={'#eee'}
                                    todayTextStyle={{color: '#828282'}}
                                    selectedDayColor={Colors.blue}
                                    onDateChange={(date, type) =>
                                      this.onHandleDate(date, type, symptons)
                                    }
                                    textStyle={{
                                      color: '#828282',
                                    }}
                                    selectedStartDate={symptons.start}
                                    selectedEndDate={symptons.end}
                                  />
                                </View>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    </CustomHiddenView>
                  </View>
                </ScrollView>
                {entity.showSymptons === true ? (
                  <View style={styles.wrapButton}>
                    <ContinueRequiredButton
                      onPress={() => {
                        this.symptonsButtonPress(contextSymptom);
                      }}
                      disabled={this.isSymptonsBtnDisabled()}
                    />
                  </View>
                ) : (
                  entity.showSymptons === false && (
                    <View style={styles.wrapButton}>
                      <ContinueRequiredButton
                        onPress={() => {
                          this.symptonsButtonPress(contextSymptom);
                        }}
                        disabled={this.isSymptonsBtnDisabled()}
                      />
                    </View>
                  )
                )}
              </SafeAreaView>
            )}
          </SymptomConsumer>
        )}
      </UserConsumer>
    );
  };

  onHandleDate = (date, type, symptons) => {
    let {entity} = this.state;
    if (type === 'END_DATE') {
      symptons.end = date._d;
    } else {
      symptons.start = date._d;
    }

    let obj = symptons;

    let indexSyntom = this.state.entity.symptonsSelected.findIndex(
      item => item.identifier === obj.identifier,
    );
    this.state.entity.symptonsSelected[indexSyntom].start = obj.start;
    this.state.entity.symptonsSelected[indexSyntom].end = obj.end;

    this.setState({
      symptonsSelected: this.state.entity.symptonsSelected,
    });

    let newArr = this.state.entity.symptonsList;
    this.setState({
      symptonsList: newArr,
    });
  };

  onPressCheckBox = value => {
    let {entity} = this.state;
    entity.showSymptons = value;
    this.setState({entity});
    if (!entity.showSymptons) {
      this.setState({continueNoSymptons: true});
    } else {
      this.setState({continueNoSymptons: false});
    }
  };
  onClickCheck = (identifier, kind) => {
    let {entity} = this.state;
    let noneOfOptionsPosition = entity.symptonsSelected.findIndex(
      selected => selected === 'Não tive sintomas',
    );
    if (noneOfOptionsPosition > -1) {
      entity.symptonsSelected = [];
    }
    entity.symptonsList.map(item => {
      if (item.identifier === 'Não tive sintomas') {
        item.identifier = item.identifier;
        item.start = '';
        item.end = '';
        item.check = false;
        item.check2 = false;
      }
      return item;
    });

    let currentSymptonsPosition = entity.symptonsSelected.findIndex(
      selected => selected.identifier === identifier.identifier,
    );
    if (currentSymptonsPosition === -1) {
      entity.symptonsSelected.push(identifier);
      if (!identifier.check) {
        identifier.check = true;
      }
      identifier.check2 = true;
      this.setState({entity});
      return;
    }

    if (kind === 'box') {
      identifier.check = false;
      identifier.check2 = false;
      identifier.start = '';
      identifier.end = '';
      entity.hasSymptons = false;
      entity.hasOximeter = false;
      entity.hasSaturation = false;
      entity.symptonsSelected.splice(currentSymptonsPosition, 1);
    } else {
      identifier.check = true;
      identifier.check2 = !identifier.check2;
      entity.hasSymptons = false;
      entity.hasOximeter = false;
      entity.hasSaturation = false;
    }

    this.setState({entity});
  };
  onClickNoneOfOptions = identifier => {
    let {entity} = this.state;
    if (!identifier.check) {
      entity.symptonsList.map(item => {
        if (item.identifier !== 'Não tive sintomas') {
          item.identifier = item.identifier;
          item.start = '';
          item.end = '';
          item.check = false;
          item.check2 = false;
        } else {
          item.identifier = item.identifier;
          item.start = '';
          item.end = '';
          item.check = true;
          item.check2 = false;
        }
        return item;
      });
      entity.symptonsSelected = [];
      entity.symptonsSelected.push(identifier);
      entity.hasSymptons = false;
      entity.hasOximeter = false;
      entity.hasSaturation = false;
      this.setState({entity});
    } else {
      entity.symptonsList.map(item => {
        if (item.identifier === 'Não tive sintomas') {
          item.identifier = item.identifier;
          item.start = '';
          item.end = '';
          item.check = false;
          item.check2 = false;
        }
        return item;
      });
      this.setState({entity});
    }

    return;
  };

  isChecked = identifier => {
    let {entity} = this.state;
    let currentSymptonsPosition = entity.symptonsSelected.findIndex(
      selected => selected.identifier === identifier,
    );
    return currentSymptonsPosition > -1;
  };
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };

  isSymptonsBtnDisabled = () => {
    let {entity} = this.state;
    let isValid = true;
    if (entity.symptonsSelected.length > 0) {
      for (const item of entity.symptonsSelected) {
        if (item.identifier === 'Não tive sintomas') {
          isValid = false;
          break;
        }
        if (item.start && item.end) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  };
  symptonsButtonPress = async contextSymptom => {
    this.setState({showLoading: true});
    try {
      let symptons;
      let {symptonsSelected} = this.state.entity;
      if (symptonsSelected && symptonsSelected.length > 1) {
        symptons = symptonsSelected.map(item => {
          if (item.identifier !== 'Não tive sintomas') {
            return {
              identifier: item.identifier,
              start: item.start,
              end: item.end,
            };
          }
        });
        if (symptons[0] === null || symptons[0] === undefined) {
          symptons.shift();
        }
      } else {
        symptons = symptonsSelected.map(item => {
          return {
            identifier: item.identifier,
            start: item.start,
            end: item.end,
          };
        });
      }

      const model = {
        created_at: moment().toDate(),
        hasSymptoms: this.state.entity.showSymptons,
        symptons: symptons,
        type: 'test',
        testDate: contextSymptom.symptom.testDate,
        testResult: contextSymptom.symptom.testResult,
      };

      await SaveSymptom(model);

      this.setState({showLoading: false});
      this.props.navigation.navigate('Home');
    } catch (error) {
      Alert.alert(
        'Aviso',
        'Ocorreu um erro, tente novamente',
        [{text: 'OK', onPress: () => this.setState({showLoading: false})}],
        {cancelable: false},
      );
    }
  };
}

const IntroText = () => (
  <View style={{marginTop: 20}}>
    <View style={styles.textContainer}>
      <View style={styles.centerText}>
        <Text style={styles.simpleText}>
          Você <Text style={styles.boldText}>está com sintomas</Text>
        </Text>
        <Text style={styles.simpleText}>hoje?</Text>
      </View>
    </View>
  </View>
);

const WhatFelling = () => (
  <View style={styles.textContainer}>
    <View style={styles.centerText}>
      <Text style={styles.boldText}>
        O que <Text style={styles.simpleText}>você está</Text>
      </Text>
      <Text style={styles.simpleText}>sentindo no momento?</Text>
    </View>
  </View>
);

const HaveSymptoms = () => (
  <View style={styles.textContainer}>
    <View style={styles.centerText}>
      <Text style={styles.simpleText}>
        Você teve <Text style={styles.boldText}>algum destes</Text>
      </Text>
      <Text style={styles.simpleText}>
        <Text style={styles.boldText}>sintomas</Text> nos últimos 14 dias?
      </Text>
    </View>
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
  simpleText: {
    fontFamily: Colors.fontFamily,
    fontSize: 15,
  },
  boldText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  centerText: {
    alignItems: 'center',
  },
  top: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
  },
  middle: {
    flex: 0.15,
    backgroundColor: Colors.secondaryColor,
    marginTop: 0,
    alignItems: 'center',
    width: '100%',
  },
  RadioButtonMiddle: {
    alignSelf: 'center',
  },
  bottom: {
    flex: 0.9,
    backgroundColor: Colors.secondaryColor,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 5,
  },
  checkboxItemContainer: {
    flex: 1,
    marginTop: 15,
  },
  symptomsButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  dateContainer: {
    height: 355,
    backgroundColor: '#ededeb',
    marginBottom: 15,
    marginTop: 5,
  },
  wrapButton: {
    paddingHorizontal: 25,
    paddingTop: 10,
    width: Dimensions.get('window').width,
  },
});
