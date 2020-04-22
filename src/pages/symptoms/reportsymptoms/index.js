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
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import Spinner from 'react-native-loading-spinner-overlay';
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

export default class ReportSymptomsPage extends Component {
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
      hasSymptonsList: [],
      symptonsStartDate: null,
      symptonsendDate: null,
      showSymptons: null,
      hasSymptons: null,
      hasOximeter: null,
      hasSaturation: null,
      shortBreath: null,
      shortBreathAnswer: null,
      symptonsList: [
        {identifier: 'Não tive sintomas', check: false, start: '', end: ''},
        {identifier: 'Falta de Ar', check: false, start: '', end: ''},
        {identifier: 'Tonturas', check: false, start: '', end: ''},
        {identifier: 'Desmaio', check: false, start: '', end: ''},
        {identifier: 'Febre', check: false, start: '', end: ''},
        {identifier: 'Falta de apetite', check: false, start: '', end: ''},
        {identifier: 'Produção de catarro', check: false, start: '', end: ''},
        {identifier: 'Confusão', check: false, start: '', end: ''},
        {identifier: 'Cansaço', check: false, start: '', end: ''},
        {identifier: 'Tosse', check: false, start: '', end: ''},
        {identifier: 'Dor de Garganta', check: false, start: '', end: ''},
        {identifier: 'Fadiga', check: false, start: '', end: ''},
        {identifier: 'Dor no Corpo', check: false, start: '', end: ''},
        {identifier: 'Dor de Cabeça', check: false, start: '', end: ''},
        {identifier: 'Dor no Peito', check: false, start: '', end: ''},
        {identifier: 'Tosse com sangue', check: false, start: '', end: ''},
        {identifier: 'Náusea ou vômito', check: false, start: '', end: ''},
        {identifier: 'Dor de barriga', check: false, start: '', end: ''},
        {identifier: 'Diarréia', check: false, start: '', end: ''},
        {identifier: 'Olhos vermelhos', check: false, start: '', end: ''},
        {identifier: 'Perda de olfato', check: false, start: '', end: ''},
      ],
    },
    breathConditionList: [
      {identifier: 'Leve: falta de ar ao fazer algum tipo de esforço físico'},
      {
        identifier:
          'Moderada: não conseguir completar frases sem precisar respirar no meio',
      },
      {
        identifier:
          'Grave: falta de ar quando em repouso, respiração acelerada, sensação de estar se afogando',
      },
    ],
    minimumDate: new Date(1900, 1, 1),
    maximumDate: moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY')
      .add(-13, 'years')
      .toDate(),
    showDatePicker: false,
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
                                isChecked={this.isChecked}
                                onClickCheck={() =>
                                  symptons.identifier === 'Não tive sintomas'
                                    ? this.onClickNoneOfOptions(symptons)
                                    : this.onClickCheck(symptons)
                                }
                                onPressExpand={() => {
                                  symptons.check = !symptons.check;

                                  let newArr = entity.symptonsList;

                                  newArr[newArr.length - 1].check = false;

                                  if (
                                    symptons.identifier !== 'Não tive sintomas'
                                  ) {
                                    this.setState({
                                      symptonsList: newArr,
                                    });
                                  }
                                }}
                              />
                              {symptons.check && (
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
                                    selectedDayColor={Colors.navigatorIconColor}
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

  isCheckedBreath = identifier => {
    let {entity} = this.state;
    return entity.shortBreathAnswer === identifier;
  };
  onClickRadioBreath = identifier => {
    let {entity} = this.state;
    entity.shortBreathAnswer = identifier;
    this.setState({entity});
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

  onPressDatePicker = () => {
    this.setState({showDatePicker: true});
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
  onChangeAirBreathAnswer = value => {
    let {entity} = this.state;
    entity.shortBreathAnswer = value;
    this.setState({entity});
  };

  checkBreath = () => {
    let {entity} = this.state;
    let shortBreathPosition = entity.symptonsSelected.findIndex(
      selected => selected === 'Falta de Ar',
    );
    let shortBreathPosition2 = entity.hasSymptonsList.findIndex(
      selected => selected === 'Falta de Ar',
    );
    if (shortBreathPosition > -1 || shortBreathPosition2 > -1) {
      entity.shortBreath = true;
    } else {
      entity.shortBreath = false;
    }
    this.setState({entity});
  };

  onPressCheckBoxOximeter = value => {
    let {entity} = this.state;
    entity.hasOximeter = value;
    this.checkBreath();
    this.setState({entity});
  };
  onPressCheckBoxSaturation = value => {
    let {entity} = this.state;
    entity.hasSaturation = value;
    this.setState({entity});
  };
  onChangeSelected = () => {
    data => this.setState({data});
    let val = this.state.data.find(e => e.selected == true);
    if (val.value == 'NO') {
      this.ShowHideComponent(false);
    } else if (val.value == 'YES') {
      //Show hidden area
      this.ShowHideComponent(true);
    }
  };
  onBackClick = () => {
    this.props.navigation.navigate('Home');
  };

  onPressRadioBtn = data => this.setState({data});
  ShowHideComponent = val => {
    if (val === true) {
      this.setState({showSymptons: true});
    } else {
      this.setState({showSymptons: false});
    }
  };

  onClickCheck = identifier => {
    let {entity} = this.state;
    let noneOfOptionsPosition = entity.symptonsSelected.findIndex(
      selected => selected === 'Não tive sintomas',
    );
    if (noneOfOptionsPosition > -1) {
      entity.symptonsSelected.splice(noneOfOptionsPosition, 1);
      entity.hasSymptons = false;
      entity.hasOximeter = false;
      entity.hasSaturation = false;
      this.checkBreath();
      this.setState({entity});
    }

    let currentSymptonsPosition = entity.symptonsSelected.findIndex(
      selected => selected.identifier === identifier.identifier,
    );
    if (currentSymptonsPosition === -1) {
      entity.symptonsSelected.push(identifier);
      identifier.check = true;
      this.checkBreath();
      this.setState({entity});
      return;
    }
    entity.symptonsSelected.splice(currentSymptonsPosition, 1);

    if (!(entity.symptonsSelected.length > 0)) {
      identifier.check = false;
      identifier.start = '';
      identifier.end = '';
      entity.hasSymptons = false;
      entity.hasOximeter = false;
      entity.hasSaturation = false;
      this.checkBreath();
    }
    this.setState({entity});
  };
  onClickNoneOfOptions = identifier => {
    let {entity} = this.state;
    let noneOfOptionsPosition = entity.symptonsSelected.findIndex(
      selected => selected.identifier === 'Não tive sintomas',
    );
    if (noneOfOptionsPosition > -1) {
      entity.symptonsSelected.splice(noneOfOptionsPosition, 1);
      entity.hasSymptons = false;
      entity.hasOximeter = false;
      entity.hasSaturation = false;
      this.setState({entity});
      return;
    }
    entity.symptonsSelected = [];
    entity.symptonsSelected.push(identifier);
    entity.hasSymptons = false;
    entity.hasOximeter = false;
    entity.hasSaturation = false;
    this.setState({entity});
  };

  isCheckedTrue = identifier => {
    return true;
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

  noSymptons = () => {
    //No Symptons Button
    console.log('Go to action without Symptons');
  };

  isSymptonsBtnDisabled = () => {
    let {entity} = this.state;
    return !(entity.symptonsSelected.length > 0);
  };
  symptonsButtonPress = async contextSymptom => {
    this.setState({showLoading: true});
    try {
      const symptonsSelected = this.state.entity.symptonsSelected.map(item => {
        return {identifier: item.identifier, start: item.start, end: item.end};
      });

      const model = {
        created_at: moment().toDate(),
        hasSymptoms: this.state.entity.showSymptons,
        symptons: symptonsSelected,
        type: contextSymptom.symptom.type,
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

const OximeterText = () => (
  <View style={styles.textContainer}>
    <View style={styles.centerText}>
      <Text style={styles.boldText}>Possui Oxímetro em casa? </Text>
    </View>
  </View>
);

const SaturationText = () => (
  <View style={styles.textContainer}>
    <View style={styles.centerText}>
      <Text style={styles.boldText}>A saturação de oxigênico </Text>
      <Text style={styles.boldText}>está acima de 93%?</Text>
    </View>
  </View>
);

const AirBreathText = () => (
  <View style={styles.textContainer}>
    <View style={styles.centerText}>
      <Text style={styles.boldText}>Como seria esta falta de ar?</Text>
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
  logo: {
    height: 150,
    width: 210,
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
  centerTextGrey: {
    alignItems: 'center',
    backgroundColor: 'grey',
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
  headerFig: {
    flex: 0.2,
    backgroundColor: 'pink',
  },
  headerTxt: {
    color: Colors.primaryHeaderColor,
    marginLeft: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  symptomsButtonContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
  },
  symptomsButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  symptomsButtonText: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
  },
  symptonsButtonText: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
  },

  leftComponentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    height: 355,
    backgroundColor: '#ededeb',
    marginBottom: 15,
    marginTop: 5,
  },
  oximeterContainer: {
    backgroundColor: '#ededeb',
    marginTop: 2,
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  breathContainer: {
    backgroundColor: '#ededeb',
    marginTop: 2,
    alignItems: 'center',
    width: '100%',
  },
  oximeterContainerRadioBtn: {
    alignSelf: 'center',
    height: 50,
  },
  wrapButton: {
    paddingHorizontal: 25,
    paddingTop: 10,
    width: Dimensions.get('window').width,
  },
});
