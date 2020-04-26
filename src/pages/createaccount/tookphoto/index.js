import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {Avatar, Header} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {Colors} from '../../../themes/variables';
import ProgressTracking from '../../../components/progresstracking';
import {LeftComponent, RightComponent} from '../../../components/customheader';
import PropTypes from 'prop-types';
import {CustomUserCamera} from '../../../components/modals/customusercamera';
import {Icon} from 'react-native-elements';

import { getUser } from '../../../firebase/User';
import { UserContext,UserConsumer } from '../../../store/user';

export default class TookPhotoPage extends Component {
  static navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  static propTypes = {
    photo: PropTypes.any,
  };
  state = {
    photo: '',
    isCameraVisible: false,
  };
  componentDidMount() {
    let {navigation} = this.props;
    if(navigation.state.params && navigation.state.params.edit){
      getUser()
        .then(this.onGetUserDataSuccess)
        .catch(this.onGetUserDataFailure);
    }
    this.setState({
      photo: navigation.getParam('photo', ''),
    });
  }

  render = () => {
    let {photo, isCameraVisible} = this.state;
    return (
     <UserConsumer>
       {
         context => (
          <SafeAreaView style={styles.container}>
            <View style={{width: '100%', paddingHorizontal: 20}}>
              <Header
                backgroundColor={Colors.secondaryColor}
                leftComponent={<LeftComponent onPress={this.onLeftButtonPress} />}
                rightComponent={
                  <RightComponent onPress={this.onRightButtonPress} />
                }
              />
            </View>
            <View style={{flex: 0.75, justifyContent: 'center'}}>
              <View style={styles.textContainer}>
                <Text style={[styles.simpleText]}>
                  <Text style={styles.boldText}>Ótimo!</Text> Caso queira, você
                </Text>
                <Text style={[styles.simpleText]}>pode escolher outra foto ou</Text>
                <Text style={[styles.simpleText]}>
                  alterar depois em seu perfil.
                </Text>
                <TouchableOpacity
                  onPress={this.openCamera}
                  style={styles.avatarContainer}>
                  {photo ? (
                    <>
                      <Avatar
                        size={200}
                        rounded
                        overlayContainerStyle={styles.avatarContainerIcon}
                        source={{uri: photo}}
                      />
                      <Icon
                        reverse
                        containerStyle={styles.photoIcon}
                        type="material"
                        name="camera-alt"
                        color={Colors.blue}
                        size={20}
                        iconStyle={{fontSize: 25}}
                      />
                    </>
                  ) : (
                    <Avatar
                      size={200}
                      rounded
                      overlayContainerStyle={styles.avatarContainerIcon}
                      icon={{
                        name: 'camera-outline',
                        type: 'material-community',
                        color: Colors.defaultIconColor,
                        size: 50,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0.25,
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'flex-end',
                paddingVertical: 20,
              }}>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.continueButtonContainer}
                  contentStyle={styles.continueButton}
                  mode="contained"
                  color={Colors.greenLight}
                  labelStyle={styles.continueButtonText}
                  onPress={this.onContinueButtonClick}>
                  CONTINUAR
                </Button>
              </View>
              <View style={styles.skipContainer}>
                <Button
                  mode="text"
                  color={Colors.defaultIconColor}
                  labelStyle={styles.skipButtonText}
                  uppercase={false}>
                  {/* Pular */}
                </Button>
              </View>
            </View>
            <CustomUserCamera
              onChangePhoto={this.onChangePhoto}
              isVisible={isCameraVisible}
              onCloseCamera={this.onCloseCamera}
            />
            <ProgressTracking amount={7} position={1} />
          </SafeAreaView>
         )
       }
     </UserConsumer>
    );
  };
  openCamera = () => {
    this.setState({
      isCameraVisible: true,
    });
  };
  onCloseCamera = () => {
    this.setState({
      isCameraVisible: false,
    });
  };
  onChangePhoto = newPhoto => {
    this.setState({
      photo: newPhoto,
      isCameraVisible: false,
    });
  };
  onLeftButtonPress = () => {
    if(this.props.navigation.state.params && this.props.navigation.state.params.edit){
      this.props.navigation.navigate("Home");
    }else{
      this.props.navigation.pop();
    }
  };
  onRightButtonPress = () => {
    if(this.props.navigation.state.params && this.props.navigation.state.params.edit){
      this.props.navigation.navigate("Home");
    }else{
      this.props.navigation.pop();
    }
  };
  skipScreen = () => {};
  onContinueButtonClick = () => {
    let {photo} = this.state;
    this.props.navigation.navigate('PersonalData', {photo: photo});
  };

  onGetUserDataSuccess = (doc) => {
    let user = doc.data();
    this.setState({photo:user.photo});
    this.context.updateUser(user);
  };

  onGetUserDataFailure = () => {
    Alert.alert("Aviso!", "Houve um erro buscar seus dados, tente novamente mais tarde.");
  };
}

TookPhotoPage.contextType = UserContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
    height: '100%',
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
