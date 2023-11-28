import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE } from '../../../../FirebaseConfig';

const auth = getAuth();
const firestore = FIRESTORE;

export function useAuth() {
  const [user, setUser] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userType, setUserType] = useState<string | undefined>();
  const [barType, setBarType] = useState<string | undefined>();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(
      auth,
      async firebaseUser => {
        if (firebaseUser) {
          const userDoc = doc(firestore, 'users', firebaseUser.uid);
          const userDocSnapshot = await getDoc(userDoc);
          const data = userDocSnapshot.data();
          setUser(firebaseUser.uid);
          setUserName(data?.firstName);
          setUserEmail(data?.Email);
          setUserType(data?.userType);
          setBarType(data?.Bar);
        } else {
          setUser(undefined);
          setUserName(undefined);
          setUserEmail(undefined);
          setUserType(undefined);
          setBarType(undefined);
        }
      },
    );

    return unsubscribeFromAuthStateChanged;
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      // Optional: Add any additional logic after sign out, like navigation
    } catch (error) {
      // Handle errors here, such as displaying a notification
    }
  };

  return {
    user,
    userName,
    userType,
    userEmail,
    barType,
    signOutUser, // Expose the signOut function
  };
}
