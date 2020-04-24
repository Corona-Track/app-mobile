import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {Header, CheckBox} from 'react-native-elements';

import {Colors} from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import {
  CenterComponent,
  RightComponent,
} from '../../../components/customheader';
import {
  CheckboxItem,
  CheckboxItemWithExpand,
} from '../../../components/customcheckboxitem';
//CONTINUE
import {
  ContinueRequiredButton,
  DoubtButton,
} from '../../../components/custombutton';

import {UserConsumer,UserContext} from '../../../store/user';

export default class MedicinesPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      medicinesSelected: [],
      frequencyByMedicine: [],
      skippedAnswer: false,
    },
    expandedMedicines: [],
  };

  componentDidMount() {
    if (this.props.navigation.state.params) {
      let { user } = this.context;
  
      if(this.props.navigation.state.params.edit && user.question.medicinesSelected){
        this.setState({
          entity: user.question
        })
      }
    }
  }

  render = () => {
    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <Header
              containerStyle={{marginHorizontal: 20}}
              backgroundColor={Colors.secondaryColor}
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
            <View style={{flex: 0.75, width: '100%'}}>
              <ScrollView nestedScrollEnabled={true} style={{width: '100%'}}>
                <IntroText />
                <View style={styles.checkboxItemContainer}>
                  <View style={{paddingHorizontal: 20}}>
                    <CheckboxItem
                      identifier={'Nenhuma das opções'}
                      isChecked={this.isChecked}
                      onClickCheck={this.onClickNoneOfOptions}
                    />
                  </View>
                  {this.renderCheckboxExpand('Anti-inflamatório')}
                  {this.renderCheckboxExpand('Analgésico')}
                  {this.renderCheckboxExpand('Corticoide')}
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
            <ProgressTracking amount={10} position={1} />
          </SafeAreaView>
        )}
      </UserConsumer>
    );
  };
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };
  onRightButtonPress = () => {
    this.props.navigation.navigate("Home");
  };
  isChecked = identifier => {
    let {entity} = this.state;
    console.log(entity, identifier);
    if(entity.medicinesSelected){
      let currentMedicinePosition = entity.medicinesSelected.findIndex(
        selected => selected === identifier,
      );
      return currentMedicinePosition > -1;
    }

    return false;
  };
  onClickCheck = identifier => {
    let {entity, expandedMedicines} = this.state;

    let expandedPosition = expandedMedicines.findIndex(
      selected => selected === identifier,
    );
    if (expandedPosition > -1) {
      expandedMedicines.splice(expandedPosition, 1);
    }

    let frequencyPosition = entity.frequencyByMedicine.findIndex(
      selected => selected.identifier === identifier,
    );
    if (frequencyPosition > -1) {
      entity.frequencyByMedicine.splice(frequencyPosition, 1);
    }

    let noneOfOptionsPosition = entity.medicinesSelected.findIndex(
      selected => selected === 'Nenhuma das opções',
    );
    if (noneOfOptionsPosition > -1) {
      entity.medicinesSelected.splice(noneOfOptionsPosition, 1);
    }

    let currentMedicinePosition = entity.medicinesSelected.findIndex(
      selected => selected === identifier,
    );
    if (currentMedicinePosition === -1) {
      entity.medicinesSelected.push(identifier);
      this.setState({entity});
      return;
    }
    entity.medicinesSelected.splice(currentMedicinePosition, 1);
    this.setState({
      entity: entity,
      expandedMedicines: expandedMedicines,
    });
  };
  onClickNoneOfOptions = identifier => {
    let {entity, expandedMedicines} = this.state;
    entity.frequencyByMedicine = [];
    expandedMedicines = [];
    let noneOfOptionsPosition = entity.medicinesSelected.findIndex(
      selected => selected === 'Nenhuma das opções',
    );
    if (noneOfOptionsPosition > -1) {
      entity.medicinesSelected.splice(noneOfOptionsPosition, 1);
      this.setState({entity, expandedMedicines});
      return;
    }
    entity.medicinesSelected = [];
    entity.medicinesSelected.push(identifier);
    this.setState({entity, expandedMedicines});
  };
  disableButton = () => {
    let {entity} = this.state;
    if (!entity.medicinesSelected || entity.medicinesSelected.length === 0) {
      return true;
    }
    if (
      entity.medicinesSelected.length === 1 &&
      entity.medicinesSelected[0] === 'Nenhuma das opções'
    ) {
      return false;
    }
    let disable = false;
    entity.medicinesSelected.forEach(medicine => {
      if (disable) {
        return;
      }
      let frequencyPosition = entity.frequencyByMedicine.findIndex(
        selected => selected.identifier === medicine,
      );
      if (frequencyPosition === -1) {
        disable = true;
      }
    });
    return disable;
  };
  renderCheckboxExpand = identifier => {
    if (!identifier) {
      return <></>;
    }
    let isExpanded = this.isExpanded(identifier);
    return (
      <View style={{paddingVertical: 5}}>
        <CheckboxItemWithExpand
          identifier={identifier}
          isChecked={() => this.isChecked(identifier)}
          onClickCheck={this.onClickCheck}
          onPressExpand={this.onPressExpand}
          isExpanded={isExpanded}
        />
        {isExpanded && (
          <View style={styles.viewExpanded}>
            <FrequencyItem
              identifier={identifier}
              isChecked={this.isCheckedFrequencyRadio}
              onClickCheck={this.onClickFrequencyRadio}
            />
          </View>
        )}
      </View>
    );
  };
  onPressExpand = medicine => {
    let {expandedMedicines} = this.state;
    let currentExpandedPosition = expandedMedicines.findIndex(
      expanded => expanded === medicine,
    );
    if (currentExpandedPosition === -1) {
      expandedMedicines.push(medicine);
      this.setState({expandedMedicines: expandedMedicines});
      return;
    }
    expandedMedicines.splice(currentExpandedPosition, 1);
    this.setState({expandedMedicines: expandedMedicines});
  };
  isExpanded = medicine => {
    let {expandedMedicines} = this.state;
    let currentExpandedPosition = expandedMedicines.findIndex(
      expanded => expanded === medicine,
    );
    return currentExpandedPosition > -1;
  };
  onClickFrequencyRadio = (frequency, identifier) => {
    let {entity} = this.state;

    let noneOfOptionsPosition = entity.medicinesSelected.findIndex(
      selected => selected === 'Nenhuma das opções',
    );
    if (noneOfOptionsPosition > -1) {
      entity.medicinesSelected.splice(noneOfOptionsPosition, 1);
    }

    let medicinePosition = entity.medicinesSelected.findIndex(
      selected => selected === identifier,
    );
    if (medicinePosition === -1) {
      entity.medicinesSelected.push(identifier);
    }

    let frequencyPosition = entity.frequencyByMedicine.findIndex(
      selected => selected.identifier === identifier,
    );
    if (frequencyPosition > -1) {
      entity.frequencyByMedicine.splice(frequencyPosition, 1);
    }
    entity.frequencyByMedicine.push({
      identifier: identifier,
      frequency: frequency,
    });
    this.setState({entity: entity});
  };
  isCheckedFrequencyRadio = (frequency, identifier) => {
    let {entity} = this.state;
    let frequencyPosition = entity.frequencyByMedicine.findIndex(
      selected =>
        selected.identifier === identifier && selected.frequency === frequency,
    );
    return frequencyPosition > -1;
  };
  onContinueButtonClick = context => {
    let {entity} = this.state;
    context.updateUser({question: entity});
    this.props.navigation.navigate('AlreadyHadFluVaccine', {entity: entity});
  };
  onDoubtPress = context => {
    let {entity} = this.state;
    entity.medicinesSelected = [];
    entity.frequencyByMedicine = [];
    entity.skippedAnswer = true;
    this.setState({entity});
    context.updateUser({question: entity});
    this.props.navigation.navigate('AlreadyHadFluVaccine', {entity: entity});
  };
}

MedicinesPage.contextType = UserContext;

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>Você toma algum(ns) dos</Text>
    <Text style={[styles.simpleText]}>
      <Text style={styles.boldText}>medicamentos</Text> abaixo?
    </Text>
  </View>
);

const FrequencyItem = ({identifier, isChecked, onClickCheck}) => {
  return (
    <View style={{paddingBottom: 20}}>
      <Text style={[styles.frequencyText]}>
        <Text style={styles.boldText}>Com qual frequência?</Text>
      </Text>
      <View style={styles.frequencyItem}>
        <FrequencyRadioButtonItem
          frequency={'Diariamente'}
          identifier={identifier}
          isChecked={isChecked}
          onClickCheck={onClickCheck}
        />
      </View>
      <View style={styles.frequencyItem}>
        <FrequencyRadioButtonItem
          frequency={'Alguns dias desta semana'}
          identifier={identifier}
          isChecked={isChecked}
          onClickCheck={onClickCheck}
        />
      </View>
      <View style={styles.frequencyItem}>
        <FrequencyRadioButtonItem
          frequency={'Alguns dias da semana passada'}
          identifier={identifier}
          isChecked={isChecked}
          onClickCheck={onClickCheck}
        />
      </View>
      <View style={styles.frequencyItem}>
        <FrequencyRadioButtonItem
          frequency={'Alguns dias no último mês'}
          identifier={identifier}
          isChecked={isChecked}
          onClickCheck={onClickCheck}
        />
      </View>
      <View style={styles.frequencyItem}>
        <FrequencyRadioButtonItem
          frequency={'Só quando tenho sintomas'}
          identifier={identifier}
          isChecked={isChecked}
          onClickCheck={onClickCheck}
        />
      </View>
    </View>
  );
};

const FrequencyRadioButtonItem = ({
  frequency,
  identifier,
  isChecked,
  onClickCheck,
}) => {
  let checked = isChecked(frequency, identifier);
  return (
    <View key={frequency} style={styles.radioButtonBox}>
      <CheckBox
        containerStyle={styles.radioButtonContainer}
        textStyle={styles.radioButtonText}
        title={frequency}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={Colors.blue}
        checked={checked}
        onPress={() => onClickCheck(frequency, identifier)}
      />
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
    ...Platform.select({
      ios: {
        marginTop: 25,
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
  checkboxItemContainer: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  viewExpanded: {
    width: '100%',
    backgroundColor: Colors.searchBackgroundColor,
    ...Platform.select({
      ios: {
        height: 300,
      },
    }),
  },
  frequencyItem: {
    ...Platform.select({
      ios: {
        height: 43,
        marginVertical: 0,
        paddingHorizontal: 0,
      },
      android: {
        height: 20,
        marginVertical: 2,
        paddingHorizontal: 20,
      },
    }),
  },
  frequencyText: {
    fontFamily: Colors.fontFamily,
    fontSize: 14,
    color: Colors.placeholderTextColor,
    textAlign: 'center',
    paddingTop: 15,
  },
  radioButtonContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: '100%',
  },
  radioButtonText: {
    fontWeight: 'normal',
    fontFamily: Colors.fontFamily,
    fontSize: 14,
    color: Colors.placeholderTextColor,
  },
  radioButtonBox: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 275,
    fontFamily: Colors.fontFamily,
    height: '100%',
  },
});
