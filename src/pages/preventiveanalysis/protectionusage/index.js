import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Colors } from '../../../themes/variables';
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
  RadioButtonItem,
  CheckboxItem,
} from '../../../components/customcheckboxitem';

import { UserConsumer, UserContext } from '../../../store/user';

export default class ProtectionUsagePage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      protectionAnswer: [],
    },
    situationsList: [
      { identifier: 'Uso sempre máscara (cirúrgica ou caseira):' },
      {
        identifier:
          'Uso sempre proteção de rosto (garrafa PET ou algo parecido)',
      }
    ],
    negativeSituationsList: [
      { identifier: 'Não constumo usar nenhum tipo de proteção ao sair de casa' },
    ],
  };

  componentDidMount() {
    let { user } = this.context;

    if (this.props.navigation.state.params.edit && user.question.protectionAnswer) {
      this.setState({
        entity: user.question
      })
    }
  }

  render = () => {
    let { entity, situationsList, negativeSituationsList } = this.state;
    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, width: '100%' }}>
              <View style={{ width: '100%', paddingHorizontal: 20 }}>
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
                  {situationsList.map(situation => {
                    return (
                      <View
                        style={{
                          
                          marginVertical: 10,
                          paddingHorizontal: 20,
                        }}>
                        <CheckboxItem
                          identifier={situation.identifier}
                          isChecked={this.isChecked}
                          onClickCheck={this.onClickCheck}
                        />
                      </View>
                    );
                  })}
                </View>
                <View style={styles.radioButtonItemContainer}>
                  {negativeSituationsList.map(situation => {
                    return (
                      <View
                        style={{
                          marginVertical: 10,
                          paddingHorizontal: 10,
                        }}>
                        <RadioButtonItem
                          identifier={situation.identifier}
                          isChecked={this.isChecked}
                          onClickCheck={this.onClickRadio}
                        />
                      </View>
                    );
                  })}
                </View>
                <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'flex-end',
                paddingVertical: 10,
                marginBottom: 30,
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
              </ScrollView>
            </View>
          
            <ProgressTracking amount={10} position={5} />
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
    let { entity } = this.state;
    context.updateUser({ question: entity });
    this.props.navigation.navigate('TouchingPrecaution', { entity: entity });
  };

  disableButton = () => {
    let { entity } = this.state;
    return !(entity.protectionAnswer && entity.protectionAnswer.length > 0);
  };
  onClickRadio = identifier => {
    let { entity } = this.state;
    entity.protectionAnswer = [];
    entity.protectionAnswer.push(identifier);
    this.setState({ entity });
  };
  onDoubtPress = context => {
    let { entity } = this.state;
    entity.protectionAnswer = [];
    entity.skippedAnswer = true;
    this.setState({ entity });
    context.updateUser({ question: entity });
    this.props.navigation.navigate('TouchingPrecaution', { entity: entity });
  };
  isChecked = identifier => {
    let { entity } = this.state;
    let currentPosition = entity.protectionAnswer.findIndex(
      selected => selected === identifier,
    );
    return currentPosition > -1;
  };
  onClickCheck = identifier => {
    let { entity } = this.state;
    let currentPositionRadio = entity.protectionAnswer.findIndex(
      selected =>
        selected ===
        'Não constumo usar nenhum tipo de proteção ao sair de casa',
    );
    if (currentPositionRadio > -1) {
      entity.protectionAnswer.splice(currentPositionRadio, 1);
    }

    let currentPosition = entity.protectionAnswer.findIndex(
      selected => selected === identifier,
    );
    if (currentPosition === -1) {
      entity.protectionAnswer.push(identifier);
      this.setState({ entity });
      return;
    }
    entity.protectionAnswer.splice(currentPosition, 1);
    this.setState({ entity });
  };
}

ProtectionUsagePage.contextType = UserContext;

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>
      Sobre o <Text style={styles.boldText}>uso de proteção.</Text>
    </Text>
    <Text style={[styles.simpleText]}>Quando saio de casa:</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
        marginBottom: 25,
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
  radioButtonItemContainer: {},
});
