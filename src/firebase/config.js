import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FUNDTAX_APP_apiKey,
  authDomain: process.env.FUNDTAX_APP_authDomain,
  databaseURL: process.env.FUNDTAX_APP_databaseURL,
  projectId: process.env.FUNDTAX_APP_projectId,
  storageBucket: process.env.FUNDTAX_APP_storageBucket,
  messagingSenderId: process.env.FUNDTAX_APP_messagingSenderId,
  appId: process.env.FUNDTAX_APP_appId,
  measurementId: process.env.FUNDTAX_APP_measurementId
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;