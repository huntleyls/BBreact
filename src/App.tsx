import React, {useEffect} from 'react';
import '../FirebaseConfig';
import RootNavigation from './Navigation/index';

import {StatusBar} from 'react-native'; // Import StatusBar

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RootNavigation />
    </>
  );
}
