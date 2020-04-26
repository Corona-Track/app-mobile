import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

import { TextInput, Button } from 'react-native-paper';

import {
  SimpleTextInput,
  PasswordTextInput,
} from '../../components/customtextinput';
// Auth
import { SignIn, SignInFacebook } from '../../firebase/Auth';

// Variables
import { Colors } from '../../themes/variables';

import { UserConsumer } from '../../store/user';

export default class LoginPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    entity: {
      email: '',
      password: '',
    },
    loading: false,
    error: '',
  };

  handleOnEmailChange = email => {
    let { entity } = this.state;
    entity.email = email;
    this.setState({ entity });
  };

  handleOnPasswordChange = password => {
    let { entity } = this.state;
    entity.password = password;
    this.setState({ entity });
  };

  isFormDisabled = () => {
    let { entity } = this.state;
    return !(entity.email && entity.password);
  };

  onFacebookButtonPress = async context => {
    try {
      const res = await SignInFacebook();
      if (!res.additionalUserInfo.isNewUser) {
        this.setState({
          loading: false,
          error: '',
        });
        this.props.navigation.navigate('Application');
        return;
      }

      if (res.additionalUserInfo.profile) {
        if (res.additionalUserInfo.profile.picture.data) {
          RNFetchBlob.fetch(
            'GET',
            res.additionalUserInfo.profile.picture.data.url,
          )
            .then(resBlob => {
              let status = resBlob.info().status;

              if (status === 200) {
                let base64Str = resBlob.base64();
                context.updateUser({
                  name: res.additionalUserInfo.profile.name,
                  email: res.additionalUserInfo.profile.email,
                  photo: `data:image/png;base64,${base64Str}`,
                  providerId: res.additionalUserInfo.providerId,
                });

                this.setState({
                  loading: false,
                  error: '',
                });

                this.props.navigation.navigate('TookPhoto', {
                  photo: `data:image/png;base64,${base64Str}`,
                });
              } else {
                this.setState({
                  loading: false,
                  error: '',
                });

                this.props.navigation.navigate('TakePhoto');
              }
            })
            .catch((errorMessage, statusCode) => {
              this.setState({
                loading: false,
                error: '',
              });

              this.props.navigation.navigate('TakePhoto');
            });
        }
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  };

  onSignInButtonPress = () => {
    const { email, password } = this.state.entity;

    this.setState({
      loading: true,
    });
    SignIn(email, password)
      .then(() => {
        this.setState({
          loading: false,
          error: '',
        });
        this.props.navigation.navigate('Application');
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  };

  // onSignUpButtonPress = () => {
  //   this.props.navigation.navigate('CreateAccount');
  // };

  // onSignInButtonPress = () => {
  //   this.props.navigation.dispatch(
  //     SwitchActions.jumpTo({routeName: 'Application'}),
  //   );
  // };

  onSignUpButtonPress = () => {
    this.props.navigation.navigate('TakePhoto');
  };

  render = () => {
    let { entity } = this.state;

    return (
      <UserConsumer>
        {context => (
          <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
              <Image
                style={styles.logo}
                resizeMode="contain"
                source={require('../../assets/images/logo.png')}
                PlaceholderContent={<ActivityIndicator />} />
              <View style={{ width: "100%" }}>
                <SimpleTextInput
                  label="E-mail"
                  value={entity.email.toLowerCase()}
                  onChangeText={this.handleOnEmailChange} />
              </View>
              <View style={{ width: "100%" }}>
                <PasswordTextInput
                  label="Senha"
                  value={entity.password}
                  onChangeText={this.handleOnPasswordChange} />
              </View>
              {this.state.error !== '' && (<Text style={styles.textError}>{this.state.error}</Text>)}
              <Button
                style={styles.signInButtonContainer}
                contentStyle={styles.signInButton}
                mode="contained"
                disabled={this.isFormDisabled()}
                color={Colors.blue}
                labelStyle={styles.signInButtonText}
                onPress={this.onSignInButtonPress}
                loading={this.state.loading}>
                ENTRAR
            </Button>
              <View style={styles.other}>
                <Text style={styles.otherText}>OU</Text>
              </View>
              {/* <Button
              icon="facebook"
              style={styles.facebookButtonContainer}
              contentStyle={styles.facebookButton}
              mode="outlined"
              color={'#2F80ED'}
              labelStyle={styles.facebookButtonText}
              uppercase={false}
              onPress={() => this.onFacebookButtonPress(context)}>
              Entrar com Facebook
            </Button> */}
              <Button
                style={styles.signUpButtonContainer}
                contentStyle={styles.signUpButton}
                mode="outlined"
                color={Colors.blue}
                labelStyle={styles.signUpButtonText}
                onPress={this.onSignUpButtonPress}>
                CADASTRE-SE
            </Button>
              <TermsButton
                onPress={() => {
                  this.props.navigation.navigate('Terms');
                }}
                label="Ao se cadastrar você aceita os Termos e Condições de Uso."
              />
            </View>
          </SafeAreaView>
        )}
      </UserConsumer>
    );
  };
}

const TermsButton = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress} style={styles.skipContainer}>
    <Text style={styles.skipButtonText}>
      Ao se cadastrar você aceita os Termos e Condições de Uso
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryTextColor,
    height: '100%',
    //marginHorizontal: 20,
  },
  innerContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', 
    height: '100%'
  },
  logo: {
    height: 180,
    width: 240,
  },
  input: {
    height: 55,
    width: '100%',
    marginHorizontal: 20,
    marginTop: 15,
    fontSize: 14
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
    width: "100%",
    borderBottomColor: Colors.searchIconColor,
    borderBottomWidth: 1,
    height: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  otherText: {
    flex: 0,
    position: "absolute",
    height: 20,
    color: Colors.searchIconColor,
    fontFamily: Colors.fontFamily,
    alignSelf: "center",
    marginTop: 10,
    width: 30,
    textAlign: "center",
    backgroundColor: Colors.primaryTextColor
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
    marginVertical: 5,
    borderRadius: 50,
    borderColor: Colors.blue,
    borderWidth: 1,
  },
  signUpButton: {
    height: 50,
    width: '100%',
    textAlign: 'center',
  },
  signUpButtonText: {
    color: Colors.blue,
    fontFamily: Colors.fontFamily,
  },
  textError: {
    width: '100%',
    marginTop: 8,
    color: Colors.colorDanger,
    textAlign: 'left',
  },
  skipButtonText: {
    fontFamily: Colors.fontFamily,
    color: Colors.placeholderTextColor,
    textAlign: 'center',
  },
  skipContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
});
