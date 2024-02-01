import React, {useEffect} from 'react';
import '../FirebaseConfig';
import RootNavigation from './Navigation/index';
import Orientation from 'react-native-orientation';

export default function App() {
  useEffect(() => {
    Orientation.lockToPortrait(); // Locks the app to portrait mode

    return () => {
      Orientation.unlockAllOrientations(); // Unlocks the orientation when the component unmounts
    };
  }, []);

  return <RootNavigation />;
}
