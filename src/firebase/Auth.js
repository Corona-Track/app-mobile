// import {Platform} from 'react-native';
// import firebase from './Config';

// import {LoginManager, AccessToken} from 'react-native-fbsdk';

// export const getUser = () => {
//   return new Promise((resolve, reject) => {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         return resolve(user);
//       }
//       return reject(new Error('Nenhum usuario encontrado'));
//     });
//   });
// };

// export const authPersist = () => {
//   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// };

// export const signOut = () => {
//   return new Promise((resolve, reject) => {
//     firebase
//       .auth()
//       .signOut()
//       .then(res => {
//         console.log(res);
//         resolve();
//       })
//       .catch(error => {
//         reject(new Error(error));
//       });
//   });
// };

// export const signInFacebook = () => {
//   return new Promise(async (resolve, reject) => {
//     if (Platform.OS === 'android') {
//       LoginManager.setLoginBehavior('web_only');
//     }

//     const result = await LoginManager.logInWithPermissions([
//       'public_profile',
//       'email',
//     ]);

//     if (result.isCancelled) {
//       reject(new Error(' Processo de login com facebook cancelado!'));
//     }
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//       reject(new Error('Falha ao conseguir Token.'));
//     }

//     const credential = firebase.auth.FacebookAuthProvider.credential(
//       data.accessToken,
//     );

//     firebase
//       .auth()
//       .signInWithCredential(credential)
//       .then(res => {
//         resolve();
//       })
//       .catch(() => {
//         reject(new Error('Falha ao Cadastrar usuario via facebook'));
//       });
//   });
// };
// export const SignIn = (email, password) => {
//   return new Promise((resolve, reject) => {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         const {uid} = firebase.auth().currentUser;

//         authPersist();
//         resolve(uid);
//       })
//       .catch(error => {
//         let errorMessage = '';
//         switch (error.code) {
//           case 'auth/invalid-email':
//             errorMessage = 'Email inválido!';
//             break;
//           case 'auth/user-disabled':
//             errorMessage = 'Seu usuário está desativado!';
//             break;
//           case 'auth/user-not-found':
//             errorMessage = 'Não existe este usuário!';
//             break;
//           case 'auth/wrong-password':
//             errorMessage = 'E-mail e/ou senha errados!';
//             break;
//           default:
//         }

//         reject(new Error(errorMessage));
//       });
//   });
// };
