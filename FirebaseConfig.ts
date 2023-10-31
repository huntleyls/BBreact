// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCkbGpmEfuIyiRe64XHMUXFdrC0LQdTfRs',
  authDomain: 'bb-react-4f0d5.firebaseapp.com',
  projectId: 'bb-react-4f0d5',
  storageBucket: 'bb-react-4f0d5.appspot.com',
  messagingSenderId: '716526511155',
  appId: '1:716526511155:web:e6f83606589f792526af46',
  measurementId: 'G-98E3G06DFY',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE = getFirestore(FIREBASE_APP);
