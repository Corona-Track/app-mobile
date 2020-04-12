import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: '***********************',
  authDomain: '***********************',
  databaseURL: '***********************',
  projectId: '***********************',
  storageBucket: '***********************',
  messagingSenderId: '***********************',
  appId: '***********************',
  measurementId: '***********************',
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
