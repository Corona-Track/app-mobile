import firebase from './Config';

export const getUser = () => {
  if (isLogged) {
    return firebase.auth().currentUser;
  }
  return new Error('Nenhum usuario encontrado');
};
export const isLogged = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      return true;
    }
    return false;
  });
};

export const authPersist = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};

export const SignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const {uid} = firebase.auth().currentUser;

        authPersist();
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
