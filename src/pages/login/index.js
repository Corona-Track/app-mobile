import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {Colors} from '../../themes/variables';
import {TextInput, Button} from 'react-native-paper';
import {SwitchActions} from 'react-navigation';

// Auth
import {SignIn, isLogged} from '../../firebase/Auth';

export default class LoginPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    entity: {
      email: 'teste@teste.com',
      password: 'teste@teste.com',
    },
    loading: false,
    error: '',
  };

  handleOnEmailChange = email => {
    let {entity} = this.state;
    entity.email = email;
    this.setState({entity});
  };
  handleOnPasswordChange = password => {
    let {entity} = this.state;
    entity.password = password;
    this.setState({entity});
  };
  isFormDisabled = () => {
    let {entity} = this.state;
    return !(entity.email && entity.password);
  };
  onFacebookButtonPress = () => {};
  onSignInButtonPress = () => {
    const {email, password} = this.state.entity;

    this.setState({
      loading: true,
    });
    SignIn(email, password)
      .then(() => {
        this.setState({
          loading: false,
          error: '',
        });
        this.props.navigation.dispatch(
          SwitchActions.jumpTo({routeName: 'Application'}),
        );
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  };
  onSignUpButtonPress = () => {
    this.props.navigation.navigate('CreateAccount');
  };

  componentDidMount() {
    if (isLogged) {
      this.props.navigation.dispatch(
        SwitchActions.jumpTo({routeName: 'Application'}),
      );
    }
  }

  render = () => {
    let {entity} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/images/logo.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <TextInput
          label="Email"
          style={styles.input}
          value={entity.email}
          theme={{
            colors: {
              primary: Colors.inputPrimaryColor,
              placeholder: Colors.placeholderTextColor,
            },
          }}
          maxLength={40}
          mode="outlined"
          onChangeText={this.handleOnEmailChange}
        />
        <TextInput
          label="Senha"
          style={styles.input}
          value={entity.password}
          theme={{
            colors: {
              primary: Colors.inputPrimaryColor,
              placeholder: Colors.placeholderTextColor,
            },
          }}
          secureTextEntry={true}
          maxLength={40}
          mode="outlined"
          onChangeText={this.handleOnPasswordChange}
        />
        {this.state.error !== '' && (
          <Text style={styles.textError}>{this.state.error}</Text>
        )}
        <Button
          style={styles.signInButtonContainer}
          contentStyle={styles.signInButton}
          mode="contained"
          disabled={this.isFormDisabled()}
          color={Colors.buttonPrimaryColor}
          labelStyle={styles.signInButtonText}
          onPress={this.onSignInButtonPress}
          loading={this.state.loading}>
          ENTRAR
        </Button>
        <Text style={styles.other}>─────────── OU ───────────</Text>
        <Button
          icon="facebook"
          style={styles.facebookButtonContainer}
          contentStyle={styles.facebookButton}
          mode="outlined"
          color={'#2F80ED'}
          labelStyle={styles.facebookButtonText}
          uppercase={false}
          onPress={this.onFacebookButtonPress}>
          Entrar com Facebook
        </Button>
        <Button
          style={styles.signUpButtonContainer}
          contentStyle={styles.signUpButton}
          mode="outlined"
          color={Colors.buttonPrimaryColor}
          labelStyle={styles.signUpButtonText}
          onPress={this.onSignUpButtonPress}>
          CADASTRE-SE
        </Button>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
    height: '100%',
    marginHorizontal: 20,
  },
  logo: {
    height: 150,
    width: 210,
  },
  input: {
    height: 50,
    width: '100%',
    marginHorizontal: 20,
    marginTop: 15,
  },
  signInButtonContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
  },
  signInButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  signInButtonText: {
    color: Colors.primaryTextColor,
    fontFamily: Colors.fontFamily,
  },
  other: {
    marginVertical: 30,
    color: Colors.placeholderTextColor,
  },
  facebookButtonText: {
    color: '#235DE3',
    fontWeight: 'bold',
    fontFamily: Colors.fontFamily,
  },
  facebookButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  facebookButtonContainer: {
    width: '100%',
    borderRadius: 50,
    borderColor: '#235DE3',
    borderWidth: 1,
  },
  signUpButtonContainer: {
    width: '100%',
    marginVertical: 20,
    borderRadius: 50,
    borderColor: Colors.buttonPrimaryColor,
    borderWidth: 1,
  },
  signUpButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  signUpButtonText: {
    color: Colors.buttonPrimaryColor,
    fontFamily: Colors.fontFamily,
  },
  textError: {
    width: '100%',
    marginTop: 8,
    color: Colors.colorDanger,
    textAlign: 'left',
  },
});
