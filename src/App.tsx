import React, {useEffect} from 'react';
import '../FirebaseConfig';
import RootNavigation from './Navigation/index';
import Orientation from 'react-native-orientation';
import {StatusBar} from 'react-native'; // Import StatusBar

export default function App() {
  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RootNavigation />
    </>
  );
}
