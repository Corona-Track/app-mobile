import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';
import PropTypes from 'prop-types';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';

import {Colors} from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import {
  LeftComponent,
  CenterComponent,
  RightComponent,
} from '../../../components/customheader';
import {ContinueRequiredButton} from '../../../components/custombutton';
import {
  SimpleTextInput,
  PasswordTextInput,
  CPFTextInput,
  SimpleDateTextInput,
  PhoneTextInput,
} from '../../../components/customtextinput';
import {CustomDropDown} from '../../../components/customdropdown';
import {
  emailValidator,
  cpfValidor,
  cepValidator,
  phoneValidator,
  cellphoneValidator,
} from '../../../services/formvalidatorservice';

import {UserConsumer} from '../../../store/user';

export default class PersonalDataPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  static propTypes = {
    entity: PropTypes.object,
  };

  state = {
    entity: {
      //   photo: '',
      name: 'Bruno Kenji Sato Romeu Yassuda',
      cpf: '42418904822',
      birthday: null,
      genre: '',
      pregnancy: '',
      cellphone: '12982573000',
      email: 'bruno.sato@live.com',
      password: '123456',
    },
    genreList: [
      {key: 'N', text: 'Não informar'},
      {key: 'M', text: 'Masculino'},
      {key: 'F', text: 'Feminino'},
    ],
    showPregnancy: false,
    pregnancyList: [{key: '1', text: 'Sim'}, {key: '0', text: 'Não'}],
    minimumDateBirthday: new Date(1900, 1, 1),
    maximumDateBirthday: moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY')
      .add(-13, 'years')
      .toDate(),
  };

  render = () => {
    let {
      entity,
      showBirthday,
      genreList,
      pregnancyList,
      minimumDateBirthday,
      maximumDateBirthday,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <Header
            backgroundColor={Colors.secondaryColor}
            leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
            centerComponent={<CenterComponent photo={entity.photo} />}
            rightComponent={
              <RightComponent onPress={this.onRightButtonPress} />
            }
          />
        </View>
        <UserConsumer>
          {context => (
            <>
              <ScrollView style={{width: '100%', paddingHorizontal: 20}}>
                <IntroText />
                <SimpleTextInput
                  label="Nome Completo"
                  value={entity.name}
                  onChangeText={this.onHandleName}
                />
                <CPFTextInput
                  label="CPF"
                  value={entity.cpf}
                  onChangeText={this.onHandleCPF}
                />
                <SimpleDateTextInput
                  minimumDate={minimumDateBirthday}
                  maximumDate={maximumDateBirthday}
                  label="Data de Nascimento"
                  value={entity.birthday}
                  onPress={this.onPressBirthdayPicker}
                  showDatePicker={showBirthday}
                  onChangeDate={this.onHandleDate}
                />
                <CustomDropDown
                  list={genreList}
                  title="Sexo"
                  onChangeSelected={this.onHandleGenre}
                  getLabel={item => item.text}
                  value={entity.genre}
                />
                {entity.genre && entity.genre.key === 'F' ? (
                  <CustomDropDown
                    list={pregnancyList}
                    title="Gestante"
                    onChangeSelected={this.onHandlePregnancy}
                    getLabel={item => item.text}
                    value={entity.pregnancy}
                  />
                ) : (
                  <></>
                )}
                <PhoneTextInput
                  label="Celular"
                  value={entity.cellphone}
                  onChangeText={this.onHandleCellphone}
                />
                <SimpleTextInput
                  label="E-mail"
                  value={entity.email}
                  onChangeText={this.onHandleEmail}
                />
                <PasswordTextInput
                  label="Senha"
                  value={entity.password}
                  onChangeText={this.onHandlePassword}
                />
                <View style={{paddingVertical: 20}}>
                  <ContinueRequiredButton
                    disabled={this.disableButton()}
                    onPress={() => {
                      context.updateUser(this.state.entity);
                      this.onContinueButtonClick();
                    }}
                  />
                </View>
              </ScrollView>
              <ProgressTracking amount={7} position={2} />
            </>
          )}
        </UserConsumer>
      </SafeAreaView>
    );
  };
  onLeftButtonPress = () => {
    this.props.navigation.pop();
  };
  onRightButtonPress = () => {
    this.props.navigation.pop();
  };
  onContinueButtonClick = () => {
    let {entity} = this.state;
    this.props.navigation.navigate('PersonalAddress', {entity: entity});
  };
  onHandleName = name => {
    let {entity} = this.state;
    entity.name = name;
    this.setState({entity});
  };
  onHandleCPF = cpf => {
    let {entity} = this.state;
    entity.cpf = cpf;
    this.setState({entity});
  };
  onPressBirthdayPicker = () => {
    this.setState({showBirthday: true});
  };
  onHandleDate = (event, date) => {
    let {entity} = this.state;
    entity.birthday = date ?? entity.birthday;
    this.setState({
      entity: entity,
      showBirthday: false,
    });
  };
  onHandleGenre = genre => {
    let {entity} = this.state;
    entity.genre = genre;
    entity.pregnancy = null;
    this.setState({entity});
  };
  onHandlePregnancy = pregnancy => {
    let {entity} = this.state;
    entity.pregnancy = pregnancy;
    this.setState({entity: entity});
  };
  onHandleCellphone = cellphone => {
    let {entity} = this.state;
    entity.cellphone = cellphone;
    this.setState({entity});
  };
  onHandleEmail = email => {
    let {entity} = this.state;
    entity.email = email;
    this.setState({entity});
  };
  onHandlePassword = password => {
    let {entity} = this.state;
    entity.password = password;
    this.setState({entity});
  };
  disableButton = () => {
    return !(
      this.isNameValid() &&
      this.isCpfValid() &&
      this.isBirthdayValid() &&
      this.isGenreValid() &&
      this.isPregnancyValid() &&
      this.isCellphoneValid() &&
      this.isEmailValid() &&
      this.isPasswordValid()
    );
  };
  isNameValid = () => {
    let {name} = this.state.entity;
    return name ?? false;
  };
  isCpfValid = () => {
    let {cpf} = this.state.entity;
    return cpfValidor(cpf);
  };
  isBirthdayValid = () => {
    let {birthday} = this.state.entity;
    return birthday ?? false;
  };
  isGenreValid = () => {
    let {genre} = this.state.entity;
    return genre ?? false;
  };
  isPregnancyValid = () => {
    let {genre, pregnancy} = this.state.entity;
    if (!genre) {
      return true;
    }
    if (genre.key === 'F') {
      return pregnancy ?? false;
    }
    return true;
  };
  isCellphoneValid = () => {
    let {cellphone} = this.state.entity;
    return cellphoneValidator(cellphone) || phoneValidator(cellphone);
  };
  isEmailValid = () => {
    let {email} = this.state.entity;
    return emailValidator(email);
  };
  isPasswordValid = () => {
    let {password} = this.state.entity;
    return password ?? false;
  };
}

const IntroText = () => (
  <View style={styles.textContainer}>
    <Text style={[styles.simpleText]}>Agora precisamos saber</Text>
    <Text style={[styles.simpleText]}>um pouco mais sobre você</Text>
    <Text style={[styles.simpleText]}>
      e <Text style={styles.boldText}>seus dados pessoais.</Text>
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
  logo: {
    height: 150,
    width: 210,
  },
  avatarContainerIcon: {
    backgroundColor: Colors.secondaryColor,
    borderColor: Colors.defaultIconColor,
    borderWidth: 3,
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
