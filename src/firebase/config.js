import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FUNDTAX_apiKey,
  authDomain: process.env.REACT_APP_FUNDTAX_authDomain,
  databaseURL: process.env.REACT_APP_FUNDTAX_databaseURL,
  projectId: process.env.REACT_APP_FUNDTAX_projectId,
  storageBucket: process.env.REACT_APP_FUNDTAX_storageBucket,
  messagingSenderId: process.env.REACT_APP_FUNDTAX_messagingSenderId,
  appId: process.env.REACT_APP_FUNDTAX_appId,
  measurementId: process.env.REACT_APP_FUNDTAX_measurementId
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;