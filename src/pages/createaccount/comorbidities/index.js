import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationEvents} from 'react-navigation';
import {Header} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import {Colors} from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import {
  LeftComponent,
  CenterComponent,
  RightComponent,
} from '../../../components/customheader';
import {CheckboxItem} from '../../../components/customcheckboxitem';
//CONTINUE
import {ContinueRequiredButton} from '../../../components/custombutton';

import {SignUp} from '../../../firebase/Auth';
import {CreateUser, UpdatePhoto} from '../../../firebase/User';

import {UserConsumer} from '../../../store/user';

export default class ComorbiditiesPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      comorbiditiesSelected: [],
    },
    comorbiditiesList: [
      {identifier: 'Nenhuma das opções'},
      {identifier: 'Gravidez de alto risco'},
      {identifier: 'Diabetes difícil de tratar'},
      {identifier: 'Doença do coração difícil de tratar'},
      {identifier: 'Doença do coração de nascimento'},
      {identifier: 'Histórico de infarto'},
      {identifier: 'Doença respiratória difícil de tratar'},
      {identifier: 'Doenças do rim avançada'},
      {identifier: 'Doenças que atacam sistema imunológico'},
      {identifier: 'Remédios que atacam sistema imunológico'},
      {identifier: 'Transplante de órgãos'},
      {identifier: 'Doenças genéticas'},
      {identifier: 'Fibrose cística'},
    ],
  };

  render = () => {
    let {entity, comorbiditiesList} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          containerStyle={{marginHorizontal: 20}}
          backgroundColor={Colors.secondaryColor}
          leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
          centerComponent={
            <CenterComponent photo={entity.photo} userName={entity.name} />
          }
          rightComponent={<RightComponent onPress={this.onRightButtonPress} />}
        />
        <ScrollView nestedScrollEnabled={true} style={{width: '100%'}}>
          <IntroText />
          <View style={styles.checkboxItemContainer}>
            {comorbiditiesList.map(comorbidity => {
              return (
                <View style={{height: 40, paddingHorizontal: 20}}>
                  <CheckboxItem
                    identifier={comorbidity.identifier}
                    isChecked={this.isChecked}
                    onClickCheck={
                      comorbidity.identifier === 'Nenhuma das opções'
                        ? this.onClickNoneOfOptions
                        : this.onClickCheck
                    }
                  />
                </View>
              );
            })}
          </View>
          <UserConsumer>
            {context => (
              <View style={styles.buttonContainer}>
                <ContinueRequiredButton
                  disabled={this.disableButton()}
                  onPress={() => {
                    this.onContinueButtonClick(context);
                  }}
                />
              </View>
            )}
          </UserConsumer>
        </ScrollView>
        <ProgressTracking amount={7} position={5} />
      </SafeAreaView>
    );
  };
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };
  onRightButtonPress = () => {
    this.props.navigation.pop();
  };
  isChecked = identifier => {
    let {entity} = this.state;
    let currentComorbidityPosition = entity.comorbiditiesSelected.findIndex(
      selected => selected === identifier,
    );
    return currentComorbidityPosition > -1;
  };
  onClickCheck = identifier => {
    let {entity} = this.state;

    let noneOfOptionsPosition = entity.comorbiditiesSelected.findIndex(
      selected => selected === 'Nenhuma das opções',
    );
    if (noneOfOptionsPosition > -1) {
      entity.comorbiditiesSelected.splice(noneOfOptionsPosition, 1);
    }

    let currentComorbidityPosition = entity.comorbiditiesSelected.findIndex(
      selected => selected === identifier,
    );
    if (currentComorbidityPosition === -1) {
      entity.comorbiditiesSelected.push(identifier);
      this.setState({entity});
      return;
    }
    entity.comorbiditiesSelected.splice(currentComorbidityPosition, 1);
    this.setState({entity});
  };
  onClickNoneOfOptions = identifier => {
    let {entity} = this.state;
    let noneOfOptionsPosition = entity.comorbiditiesSelected.findIndex(
      selected => selected === 'Nenhuma das opções',
    );
    if (noneOfOptionsPosition > -1) {
      entity.comorbiditiesSelected.splice(noneOfOptionsPosition, 1);
      this.setState({entity});
      return;
    }
    entity.comorbiditiesSelected = [];
    entity.comorbiditiesSelected.push(identifier);
    this.setState({entity});
  };
  disableButton = () => {
    let {entity} = this.state;
    return !(
      entity &&
      entity.comorbiditiesSelected &&
      entity.comorbiditiesSelected.length > 0
    );
  };

  onContinueButtonClick = async context => {
    let {entity} = this.state;

    let nextPage = 'FinishUncontaminated';
    if (entity.contaminated) {
      nextPage = 'FinishContaminated';
    }

    context.updateUser({question: entity});

    const user = {...context.user};
    user.question.comorbiditiesSelected = entity.comorbiditiesSelected;

    await SignUp(user.email, user.password);

    const {email, password, ...model} = user;

    console.log('model', model);
    await CreateUser(model);

    this.props.navigation.navigate(nextPage, {entity: entity});
  };
}

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>Você possui alguma(s)</Text>
    <Text style={[styles.simpleText]}>
      das <Text style={styles.boldText}>condições</Text> abaixo?
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
  checkboxItemContainer: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
