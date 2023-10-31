import React, {useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {FIRESTORE} from '../../../../FirebaseConfig';

const auth = getAuth();
const firestore = FIRESTORE;

export function useAuth() {
  const [user, setUser] = React.useState<string>();
  const [userType, setUserType] = React.useState<string>();
  const [barType, setBarType] = React.useState<string>();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(
      auth,
      async firebaseUser => {
        if (firebaseUser) {
          const userDoc = doc(firestore, 'users', firebaseUser.uid);
          const userDocSnapshot = await getDoc(userDoc);
          const data = userDocSnapshot.data();
          setUser(firebaseUser.uid);
          setUserType(data?.userType);
          setBarType(data?.Bar);
        } else {
          setUser(undefined);
          setUserType(undefined);
          setBarType(undefined);
        }
      },
    );

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
    userType,
    barType,
  };
}
