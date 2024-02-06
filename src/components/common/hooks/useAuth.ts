import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE } from '../../../../FirebaseConfig';

// Initialize Firebase Authentication and Firestore
const auth = getAuth();
const firestore = FIRESTORE;

export function useAuth() {
  const [user, setUser] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userType, setUserType] = useState<string | undefined>();
  const [barType, setBarType] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        // User is signed in, fetch additional user details from Firestore
        const userDoc = doc(firestore, 'users', firebaseUser.uid);
        const userDocSnapshot = await getDoc(userDoc);
        if (userDocSnapshot.exists()) {
          const data = userDocSnapshot.data();
          setUser(firebaseUser.uid);
          setUserName(data?.firstName);
          setUserEmail(data?.Email);
          setUserType(data?.userType);
          setBarType(data?.Bar);
        }
      } else {
        // User is signed out, reset state
        setUser(undefined);
        setUserName(undefined);
        setUserEmail(undefined);
        setUserType(undefined);
        setBarType(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribeFromAuthStateChanged(); // Cleanup subscription on unmount
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      // After sign out, clear user state
      setUser(undefined);
      setUserName(undefined);
      setUserEmail(undefined);
      setUserType(undefined);
      setBarType(undefined);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    userName,
    userEmail,
    userType,
    barType,
    loading,
    signOutUser,
  };
}
