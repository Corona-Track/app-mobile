import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyALu5CxJwyrEr8FLqaJHzQx93XbhdXzcII',
  authDomain: 'coronatrack-6e300.firebaseapp.com',
  databaseURL: 'https://coronatrack-6e300.firebaseio.com',
  projectId: 'coronatrack-6e300',
  storageBucket: 'coronatrack-6e300.appspot.com',
  messagingSenderId: '564610231720',
  appId: '1:564610231720:web:92729b6c2a40c2e523819d',
  measurementId: 'G-BKHPCMXQBQ',
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
