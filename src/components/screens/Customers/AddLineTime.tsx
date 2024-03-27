import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {collection, getDocs} from 'firebase/firestore';
import SmallBannerAd2 from '../../common/ads/SmallBannerAd2';
import SelectDropdown from 'react-native-select-dropdown';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const AddLineTime: React.FC = () => {
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
    {value: 60, Label: '60'},
  ];

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const requestLocationPermission = async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); // use PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION for Android

    if (result === RESULTS.DENIED) {
      const requestResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); // use PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION for Android

      if (requestResult === RESULTS.GRANTED) {
        // Permission granted, you can use the location
      } else {
        // Permission denied
      }
    } else if (result === RESULTS.GRANTED) {
      // Permission already granted, you can use the location
    }
  };

  useEffect(() => {
    requestLocationPermission().then(() => {
      Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation(new firebase.firestore.GeoPoint(latitude, longitude));
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
        },
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Set Line Time for</Text>
      <Text style={styles.headerText}>{}</Text>

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
        <Text style={styles.buttonText}>Post</Text>
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
    backgroundColor: '#f5f5f5', // Match background color
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#001f3f', // Match header style
    padding: 8,
    paddingTop: 16, // Increased top padding to bring the header down
    textAlign: 'center', // Center align text
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Style similar to itemContainer
    marginBottom: 15,
  },
  barName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#001f3f', // Match name style
  },
  time: {
    fontSize: 14,
    color: '#333', // Match description style
  },
});

export default AddLineTime;
