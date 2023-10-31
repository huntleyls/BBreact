import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {FIRESTORE} from '../../../../FirebaseConfig';

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Function to fetch data
    const fetchDatesFromFirestore = async () => {
      try {
        const calendarCollectionRef = collection(FIRESTORE, 'Calendar');
        const querySnapshot = await getDocs(calendarCollectionRef);

        const newMarkedDates = {};

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const timeAndDate = data.timeAndDate
            .toDate()
            .toISOString()
            .split('T')[0];
          newMarkedDates[timeAndDate] = {marked: true};
        });

        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchDatesFromFirestore();
  }, []);

  const handleDayPress = day => {
    const timeAndDate = day.dateString;
    setSelectedDate(timeAndDate);

    // Function to fetch data for the selected date
    const fetchEventDataFromFirestore = async () => {
      try {
        const calendarCollectionRef = collection(FIRESTORE, 'Calendar');
        const querySnapshot = await getDocs(
          query(
            calendarCollectionRef,
            where('timeAndDate', '==', new Date(timeAndDate)),
          ),
        );

        querySnapshot.forEach(doc => {
          const data = doc.data();
          setEventTitle(data.eventTitle);
          setTime(data.time);
        });
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventDataFromFirestore();
  };

  return (
    <View style={styles.container}>
      <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      {selectedDate && (
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{eventTitle}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  time: {
    fontSize: 16,
  },
});

export default CalendarScreen;
