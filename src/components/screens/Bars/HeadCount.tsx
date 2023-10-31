import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const NumberComponent = () => {
  const [number, setNumber] = useState<number>(0);
  const {barType} = useAuth();
  const documentRef = barType ? doc(FIRESTORE, 'headcount', barType) : null;
  // Import necessary functions

  useEffect(() => {
    const fetchNumber = async () => {
      if (documentRef) {
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
          setNumber(docSnapshot.data().number || 0); // Assuming 'number' is the field name in the document
        }
      }
    };

    fetchNumber();
  }, [barType, documentRef]);

  const increment = async () => {
    try {
      await updateDoc(documentRef, {
        number: number + 1,
      });
      setNumber(prev => prev + 1);
    } catch (error) {
      console.error('Error updating number:', error);
    }
  };

  const decrement = async () => {
    try {
      await updateDoc(documentRef, {
        number: number - 1,
      });
      setNumber(prev => prev - 1);
    } catch (error) {
      console.error('Error updating number:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Headcount</Text>
      <Text>Bar: {barType}</Text>
      <Text>{number}</Text>
      <Button title="+" onPress={increment} />
      <Button title="-" onPress={decrement} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NumberComponent;
