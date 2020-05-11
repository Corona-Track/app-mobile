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
import { RadioButtonTripleResizableItem } from '../../../components/customcheckboxitem';

import { UserConsumer, UserContext } from '../../../store/user';

export default class HomePrecautionsPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      showerAnswer: null,
      changeClothesAnswer: null,
      containerCleanupAnswer: null,
    },
  };

  componentDidMount() {
    let { user } = this.context;

    if (this.props.navigation.state.params && this.props.navigation.state.params.edit) {
      this.setState({
        entity: user.question
      })
    }
  }

  render = () => {
    let { entity } = this.state;
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
                  <ShowerText />
                  <View style={{ height: 50 }}>
                    <RadioButtonTripleResizableItem
                      value={entity.showerAnswer}
                      onPressCheckbox={this.onChangeShowerAnswer}
                      firstTitle={'Sempre'}
                      secondTitle={'Às vezes'}
                      thirdTitle={'Nunca'}
                    />
                  </View>
                  <ChangeClothesText />
                  <View style={{ height: 50 }}>
                    <RadioButtonTripleResizableItem
                      value={entity.changeClothesAnswer}
                      onPressCheckbox={this.onChangeClothesAnswer}
                      firstTitle={'Sempre'}
                      secondTitle={'Às vezes'}
                      thirdTitle={'Nunca'}
                    />
                  </View>
                  <ContainerCleanupText />
                  <View style={{ height: 50 }}>
                    <RadioButtonTripleResizableItem
                      value={entity.containerCleanupAnswer}
                      onPressCheckbox={this.onChangeCleanupAnswer}
                      firstTitle={'Sempre'}
                      secondTitle={'Às vezes'}
                      thirdTitle={'Nunca'}
                    />
                  </View>
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
      
            <ProgressTracking amount={10} position={7} />
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
    this.props.navigation.navigate('OutsideWork', { entity: entity });
  };
  disableButton = () => {
    let { entity } = this.state;
    return !(
      entity.showerAnswer &&
      entity.changeClothesAnswer &&
      entity.containerCleanupAnswer
    );
  };
  onDoubtPress = context => {
    let { entity } = this.state;
    entity.showerAnswer = null;
    entity.changeClothesAnswer = null;
    entity.containerCleanupAnswer = null;
    entity.skippedAnswer = true;
    this.setState({ entity });
    context.updateUser({ question: entity });
    this.props.navigation.navigate('OutsideWork', { entity: entity });
  };
  onChangeShowerAnswer = value => {
    let { entity } = this.state;
    entity.showerAnswer = value;
    this.setState({ entity });
  };
  onChangeClothesAnswer = value => {
    let { entity } = this.state;
    entity.changeClothesAnswer = value;
    this.setState({ entity });
  };
  onChangeCleanupAnswer = value => {
    let { entity } = this.state;
    entity.containerCleanupAnswer = value;
    this.setState({ entity });
  };
}

HomePrecautionsPage.contextType = UserContext;

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>
      <Text style={styles.boldText}>Cuidados ao voltar para casa:</Text>
    </Text>
  </View>
);

const ShowerText = () => (
  <View style={[styles.textContainer, { marginTop: 20 }]}>
    <Text
      style={[
        styles.simpleText,
        { fontSize: 15, color: Colors.placeholderTextColor },
      ]}>
      Tomo banho ou lavo mãos e
    </Text>
    <Text
      style={[
        styles.simpleText,
        { fontSize: 15, color: Colors.placeholderTextColor },
      ]}>
      braços assim que entro em casa
    </Text>
  </View>
);

const ChangeClothesText = () => (
  <View style={[styles.textContainer, { marginTop: 20 }]}>
    <Text
      style={[
        styles.simpleText,
        { fontSize: 15, color: Colors.placeholderTextColor },
      ]}>
      Troco a roupa e guardo-as
    </Text>
    <Text
      style={[
        styles.simpleText,
        { fontSize: 15, color: Colors.placeholderTextColor },
      ]}>
      em local separado
    </Text>
  </View>
);

const ContainerCleanupText = () => (
  <View style={[styles.textContainer, { marginTop: 20 }]}>
    <Text
      style={[
        styles.simpleText,
        { fontSize: 15, color: Colors.placeholderTextColor },
      ]}>
      Quando trago compras, limpo
    </Text>
    <Text
      style={[
        styles.simpleText,
        { fontSize: 15, color: Colors.placeholderTextColor },
      ]}>
      os produtos com água
    </Text>
    <Text
      style={[
        styles.simpleText,
        { fontSize: 15, color: Colors.placeholderTextColor },
      ]}>
      sanitária ou álcool em gel
    </Text>
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
        marginBottom: 10,
      },
      android: {
        marginTop: 20,
        marginBottom: 10,
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
  radioButtonItemContainer: {
    width: '100%',
  },
});
