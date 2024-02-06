import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Import initializeAuth and getReactNativePersistence
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// Import AsyncStorage from @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration (unchanged)
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
const app = initializeApp(firebaseConfig);

// Initialize Firestore (unchanged)
export const FIRESTORE = getFirestore(app);

// Initialize Firebase Auth with persistence
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
