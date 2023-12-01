import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD20VO_jvgogYTOr9io3tE1I3SdGipVvIM",
  authDomain: "daily-moments-c0a22.firebaseapp.com",
  projectId: "daily-moments-c0a22",
  storageBucket: "daily-moments-c0a22.appspot.com",
  messagingSenderId: "1080724907393",
  appId: "1:1080724907393:web:492f2a863a3da5a0443480"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();