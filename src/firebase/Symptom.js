import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import KEYS from './Constant';

export const GetSymptomByUser = () => {
  return new Promise((resolve, reject) => {
    const { uid } = auth().currentUser;

    firestore()
      .collection(KEYS.TABLE_SYMPTOM)
      .where('user_id', '==', uid)
      .get()
      .then(res => {
        if (!res.empty) {
          let result = res.docs.map(item => item.data());
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

export const SaveSymptom = async model => {


  const symptomsRegister = await GetSymptomByUser()
  const lastSymptomsRegisterDate = symptomsRegister[0].created_at.toDate()


  const isSameRegisterOfToday = moment().isSame(lastSymptomsRegisterDate, 'day')

  if (isSameRegisterOfToday)
    return new Promise((resolve, reject) => {
      const { uid } = auth().currentUser;
      model.user_id = uid;

      const symptonsRef = firestore().collection(KEYS.TABLE_SYMPTOM)
      symptonsRef.where("user_id", "==", uid).where("created_at", "==", symptomsRegister[0].created_at).limit(1).get().then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        let symptonId

        snapshot.forEach(function (doc) {
          if (doc.id)
            symptonId = doc.id
        });


        symptonsRef.doc(symptonId).update({
          ...model
        }).then(res => {
          resolve(res);
        })
      }
      )

        .catch(error => {
          console.log(error)
          reject(new Error(error));
        });
    });

  return new Promise((resolve, reject) => {
    const { uid } = auth().currentUser;
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
