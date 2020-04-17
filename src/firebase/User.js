import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import KEYS from './Constant';

export const SaveUser = model => {
  return new Promise((resolve, reject) => {
    const {uid} = auth().currentUser;
    firestore()
      .collection(KEYS.TABLE_USER)
      .doc(uid)
      .set(model)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};

export const UpdatePhoto = photo => {
  return new Promise((resolve, reject) => {
    const {uid} = auth().currentUser;

    console.log('UpdatePhoto', uid);
    firestore()
      .doc(`${KEYS.TABLE_USER}/${uid}`)
      .update({
        photo: firestore.Blob.fromBase64String(photo),
      })
      .then(res => {
        console.log('CreateUser', res);
        resolve(res);
      })
      .catch(error => {
        console.log('CreateUser', error);
        reject(new Error(error));
      });
  });
};
