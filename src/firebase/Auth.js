import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

export const SignInFacebook = async () => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
};

export const getUser = () => {
  return new Promise((resolve, reject) => {
    const {uid} = auth().currentUser;
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    auth()
      .signOut()
      .then(res => {
        console.log(res);
        resolve();
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};

export const SignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const {uid} = auth().currentUser;
        resolve(uid);
      })
      .catch(error => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Email inválido!';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Seu usuário está desativado!';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Não existe este usuário!';
            break;
          case 'auth/wrong-password':
            errorMessage = 'E-mail e/ou senha errados!';
            break;
          default:
        }

        reject(new Error(errorMessage));
      });
  });
};

export const SignUp = (email, password, name, photo) => {
  return new Promise((resolve, reject) => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const {uid} = auth().currentUser;
      resolve(uid);
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const {uid} = auth().currentUser;
        resolve(uid);
      })
      .catch(error => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email ja está em uso!';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Seu email é invalidado!';
            break;
          default:
        }

        reject(new Error(errorMessage));
      });
  });
};
