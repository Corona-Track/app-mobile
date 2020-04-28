import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import KEYS from './Constant';

export const GetSymptomByUser = () => {
  return new Promise((resolve, reject) => {
    const {uid} = auth().currentUser;

    firestore()
      .collection(KEYS.TABLE_SYMPTOM)
      .where('user_id', '==', uid)
      .get()
      .then(res => {
        if (!res.empty) {
          let result = res.docs.map(item => {
            let data = item.data();
            data.id = item.id;
            return data;
          });
          result = result.sort(
            (a, b) =>
              moment(b.created_at.toDate()).unix() -
              moment(a.created_at.toDate()).unix(),
          );
          resolve(result);
        }
        resolve([]);
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};

export const SaveSymptom = model => {
  return new Promise((resolve, reject) => {
    const {uid} = auth().currentUser;

    model.user_id = uid;

    firestore()
      .collection(KEYS.TABLE_SYMPTOM)
      .add(model)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};

export const UpdateSymptom = model => {
  return new Promise((resolve, reject) => {
    const {uid} = auth().currentUser;
    const id = model.id;
    model.user_id = uid;

    delete model.id;

    firestore()
      .collection(KEYS.TABLE_SYMPTOM)
      .doc(id)
      .set(model)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};
