import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Header} from 'react-native-elements';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';

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

import {SaveUser} from '../../../firebase/User';

import {UserConsumer,UserContext} from '../../../store/user';

export default class RelativesHomePrecautionsPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    entity: PropTypes.object,
  };
  state = {
    entity: {
      relativesShowerAnswer: null,
      relativesChangeClothesAnswer: null,
      relativesContainerCleanupAnswer: null,
    },
    showLoading: false,
  };

  componentDidMount() {
    let { user } = this.context;

    if(this.props.navigation.state.params && this.props.navigation.state.params.edit){
      this.setState({
        entity: user.question
      })
    }
  }

  render = () => {
    let {entity, showLoading} = this.state;
    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <Spinner visible={showLoading} />
            <View style={{flex: 1, width: '100%'}}>
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
                  <HomeEnterText />
                  <View style={{height: 50, justifyContent: 'center'}}>
                    <RadioButtonTripleResizableItem
                      value={entity.relativesShowerAnswer}
                      onPressCheckbox={this.onChangeRelativesShowerAnswer}
                      firstTitle={'Sempre'}
                      secondTitle={'Às vezes'}
                      thirdTitle={'Nunca'}
                    />
                  </View>
                  <ChangeClothesText />
                  <View style={{height: 50, justifyContent: 'center'}}>
                    <RadioButtonTripleResizableItem
                      value={entity.relativesChangeClothesAnswer}
                      onPressCheckbox={
                        this.onChangeRelativesChangeClothesAnswer
                      }
                      firstTitle={'Sempre'}
                      secondTitle={'Às vezes'}
                      thirdTitle={'Nunca'}
                    />
                  </View>
                  <CleanPotText />
                  <View style={{height: 50}}>
                    <RadioButtonTripleResizableItem
                      value={entity.relativesContainerCleanupAnswer}
                      onPressCheckbox={
                        this.onChangeRelativesContainerCleanupAnswer
                      }
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
                paddingVertical: 20,
                marginBottom:30
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
 
  onDoubtPress = async context => {
    let {entity} = this.state;
    entity.relativesShowerAnswer = null;
    entity.relativesChangeClothesAnswer = null;
    entity.relativesContainerCleanupAnswer = null;
    // entity.skippedAnswer = true;
    this.setState({entity});
    context.updateUser({question: entity});  
    let nextRoute = 'FinishRemaining';


    await this.updateUser(context, entity, nextRoute);
  };
  onContinueButtonClick = async context => {
    let {entity} = this.state;

    this.setState({showLoading: true});

    let nextRoute = 'FinishComplete';
    if (entity.skippedAnswer) {
      nextRoute = 'FinishRemaining';
    }
    context.updateUser({question: entity}); 

    await this.updateUser(context, entity, nextRoute);
  };

  async updateUser(context, entity, nextRoute) {
    try {
      let user = context.user;
      user.question.relativesShowerAnswer = entity.relativesShowerAnswer;
      user.question.relativesChangeClothesAnswer = entity.relativesChangeClothesAnswer;
      user.question.relativesContainerCleanupAnswer =
        entity.relativesContainerCleanupAnswer;

      const {password, ...model} = user;
      await SaveUser(model);
      this.setState({showLoading: false});
      this.props.navigation.navigate(nextRoute, {entity: entity});
    } catch (error) {
      Alert.alert(
        'Aviso',
        'Ocorreu um erro, tente novamente',
        [{text: 'OK', onPress: () => this.setState({showLoading: false})}],
        {cancelable: false},
      );
    }
  }
  disableButton = () => {
    let {entity} = this.state;
    return !(
      entity.relativesShowerAnswer &&
      entity.relativesChangeClothesAnswer &&
      entity.relativesContainerCleanupAnswer
    );
  };
  onChangeRelativesShowerAnswer = value => {
    let {entity} = this.state;
    entity.relativesShowerAnswer = value;
    this.setState({entity});
  };
  onChangeRelativesChangeClothesAnswer = value => {
    let {entity} = this.state;
    entity.relativesChangeClothesAnswer = value;
    this.setState({entity});
  };
  onChangeRelativesContainerCleanupAnswer = value => {
    let {entity} = this.state;
    entity.relativesContainerCleanupAnswer = value;
    this.setState({entity});
  };
}

RelativesHomePrecautionsPage.contextType = UserContext;

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>
      Sobre <Text style={styles.boldText}>os cuidados</Text> que os demais
    </Text>
    <Text style={[styles.simpleText]}>
      moradores têm ao <Text style={styles.boldText}>entrar em casa:</Text>
    </Text>
  </View>
);

const HomeEnterText = () => (
  <View style={[styles.textContainer, {marginTop: 20}]}>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      Tomam banho ou lavam mãos e
    </Text>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      braços assim que entram em casa?
    </Text>
  </View>
);

const ChangeClothesText = () => (
  <View style={[styles.textContainer, {marginTop: 20}]}>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      Trocam a roupa e guardam-nas
    </Text>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      em local separado?
    </Text>
  </View>
);

const CleanPotText = () => (
  <View style={[styles.textContainer, {marginTop: 20}]}>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      Quando trazem vasilhames, limpam
    </Text>
    <Text
      style={[
        styles.simpleText,
        {fontSize: 15, color: Colors.placeholderTextColor},
      ]}>
      com água sanitária ou similar?
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
    fontSize: 18,
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
});
