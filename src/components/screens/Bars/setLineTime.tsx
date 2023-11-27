import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';

const SetLineTime: React.FC = () => {
  const {barType} = useAuth();
  const [barName, setBarName] = useState<string>('');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [docId, setDocId] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);

  const hoursList = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
    {value: 6, label: '6'},
    {value: 7, label: '7'},
    {value: 8, label: '8'},
    {value: 9, label: '9'},
    {value: 10, label: '10'},
    {value: 11, label: '11'},
    {value: 12, label: '12'},
  ];

  const minList = [
    {value: 0, label: '0'},
    {value: 5, label: '5'},
    {value: 10, label: '10'},
    {value: 15, label: '15'},
    {value: 20, label: '20'},
    {value: 25, label: '25'},
    {value: 30, label: '30'},
    {value: 35, label: '35'},
    {value: 40, label: '40'},
    {value: 45, label: '45'},
    {value: 50, label: '50'},
    {value: 55, label: '55'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (barType) {
        const barQuery = query(
          collection(FIRESTORE, 'linetimes'),
          where('Bar', '==', barType),
        );

        const querySnapshot = await getDocs(barQuery);

        // Assuming there's only one document that matches the barType.
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const barData = doc.data();
          setBarName(barData.BarName);
          setHours(barData.hours || 0);
          setMinutes(barData.minutes || 0);
          setDocId(doc.id); // Store the document ID
        }
      }
    };

    fetchData();
  }, [barType]);

  const saveTime = async (saveHours: number, saveMinutes: number) => {
    if (docId) {
      // Use docId as the document ID to fetch the document reference
      const barDoc = doc(FIRESTORE, 'linetimes', docId);

      // Update the document with the new hours and minutes
      try {
        await updateDoc(barDoc, {
          hours: saveHours,
          minutes: saveMinutes,
        });
        console.log('Document successfully updated!');
        setHours(saveHours); // Update state after successful save
        setMinutes(saveMinutes);
      } catch (error) {
        // Handle any errors that occur during the update
        console.error('Failed to update the document:', error);
      }
    } else {
      // Handle the case where docId is undefined or null
      console.error('Document ID is undefined or null');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Set Line Time for</Text>
      <Text style={styles.headerText}>{barName}</Text>
      <Text style={styles.subHeaderText}>
        Current Line Time: {hours} hours, {minutes} minutes
      </Text>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Hours:</Text>
        <SelectDropdown
          data={hoursList}
          onSelect={selectedItem => setSelectedHours(selectedItem.value)}
          buttonTextAfterSelection={selectedItem => selectedItem.label}
          rowTextForSelection={item => item.label}
          defaultValueByIndex={hours}
          buttonStyle={styles.dropdownStyle}
        />
      </View>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Minutes:</Text>
        <SelectDropdown
          data={minList}
          onSelect={selectedItem => setSelectedMinutes(selectedItem.value)}
          buttonTextAfterSelection={selectedItem => selectedItem.label}
          rowTextForSelection={item => item.label}
          defaultValueByIndex={minutes}
          buttonStyle={styles.dropdownStyle}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (selectedHours !== null && selectedMinutes !== null) {
            saveTime(selectedHours, selectedMinutes);
          }
        }}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => saveTime(0, 0)}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001f3f',
    alignSelf: 'center',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 16,
    color: '#555',
    marginRight: 10, // Adjust the margin to bring the label closer to the dropdown
  },
  dropdownStyle: {
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#001f3f',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#001f3f',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SetLineTime;
