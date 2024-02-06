import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {doc, getDoc, updateDoc} from 'firebase/firestore';

const NumberComponent = () => {
  const [number, setNumber] = useState<number>(0);
  const {barType} = useAuth();
  const documentRef = barType ? doc(FIRESTORE, 'headcount', barType) : null;

  useEffect(() => {
    const fetchNumber = async () => {
      if (documentRef) {
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
          setNumber(docSnapshot.data().number || 0);
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

  const clearNumber = async () => {
    try {
      await updateDoc(documentRef, {
        number: 0,
      });
      setNumber(0);
    } catch (error) {
      console.error('Error clearing number:', error);
    }
  };

  const getBarName = type => {
    switch (type) {
      case 'BS':
        return 'Boone Saloon';
      case 'RSAH':
        return 'Rivers Street Ale House';
      case 'TAPP':
        return 'Tapp Room';
      case 'HS':
        return 'Howard Station';
      case 'FE':
        return 'Fizz ED';
      default:
        return ''; // Default case if barType does not match
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headCountTitle}>Headcount</Text>
      <Text style={styles.barTypeText}>Bar: {getBarName(barType)}</Text>
      <Text style={styles.numberDisplay}>{number}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={clearNumber}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headCountTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barTypeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  numberDisplay: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%', // Adjust as needed
  },
  button: {
    backgroundColor: '#001f3f',
    paddingVertical: 20, // Increased padding
    paddingHorizontal: 30, // Increased padding
    borderRadius: 10, // Adjusted for aesthetics
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 100, // Set minimum width
    minHeight: 50, // Set minimum height
  },
  buttonText: {
    color: 'white',
    fontSize: 24, // Increased font size
  },
  clearButton: {
    backgroundColor: '#FF6347',
    padding: 15, // Increased padding
    borderRadius: 10, // Adjusted for aesthetics
    alignItems: 'center',
    minWidth: 100,
    marginTop: 20,
  },
});

export default NumberComponent;
