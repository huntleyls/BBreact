import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  collection,
  query,
  getDocs,
  where,
  Timestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {FIRESTORE} from '../../../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Event {
  eventId: string;
  name: string;
  date: Timestamp;
  description: string;
  barName: string;
  count: number;
  attending: boolean;
}

interface Section {
  title: string;
  data: Event[];
}

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const barTypes = ['BS', 'HS', 'TAPP', 'RSAH'];
  const [userResponses, setUserResponses] = useState({});

  const fetchDatesFromFirestore = async () => {
    try {
      let newMarkedDates = {};

      for (const barType of barTypes) {
        const eventsCollectionRef = collection(
          FIRESTORE,
          'Calendar',
          barType,
          'Events',
        );
        const querySnapshot = await getDocs(eventsCollectionRef);

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const date = data.date.toDate().toISOString().split('T')[0];
          newMarkedDates[date] = {marked: true, dotColor: 'blue'};
        });
      }

      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error('Error fetching dates:', error);
    }
  };

  const loadUserResponses = async () => {
    try {
      const savedResponses = await AsyncStorage.getItem('userResponses');
      if (savedResponses !== null) {
        setUserResponses(JSON.parse(savedResponses));
      }
    } catch (error) {
      console.error('Failed to load user responses:', error);
    }
  };

  const fetchEventsForDate = async dateString => {
    try {
      const eventsByBar = {};

      for (const barType of barTypes) {
        const dayStart = new Date(dateString + 'T00:00:00Z');
        const dayEnd = new Date(dateString + 'T23:59:59Z');
        const eventsCollectionRef = collection(
          FIRESTORE,
          'Calendar',
          barType,
          'Events',
        );
        const q = query(
          eventsCollectionRef,
          where('date', '>=', Timestamp.fromDate(dayStart)),
          where('date', '<=', Timestamp.fromDate(dayEnd)),
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const event = {
            eventId: doc.id,
            name: data.name,
            date: data.date,
            description: data.description,
            count: data.count,
            barName: data.barName,
            attending: userResponses[doc.id] ?? false,
          };
          // Use barName as the key for grouping
          const barNameKey = data.barName;
          if (!eventsByBar[barNameKey]) {
            eventsByBar[barNameKey] = [event];
          } else {
            eventsByBar[barNameKey].push(event);
          }
        });
      }

      // Transform the events object into an array of sections
      const sortedBarNames = Object.keys(eventsByBar).sort();
      const newSections = sortedBarNames.map(barName => ({
        title: barName,
        data: eventsByBar[barName].sort((a, b) => a.name.localeCompare(b.name)),
      }));

      setSections(newSections);
    } catch (error) {
      console.error('Error fetching events for date:', error);
    }
  };

  const toggleAttendance = async (sectionTitle, eventId) => {
    // Determine the bar type based on the section title
    let bar;
    if (sectionTitle === 'Rivers Street Ale House') {
      bar = 'RSAH';
    } else if (sectionTitle === 'Boone Saloon') {
      bar = 'BS';
    } else if (sectionTitle === 'The Tapp Room') {
      bar = 'TAPP';
    } else if (sectionTitle === 'Howard Station') {
      bar = 'HS';
    } else {
      console.error('Unknown section title');
      return;
    }

    setUserResponses(prevResponses => {
      const newResponses = {
        ...prevResponses,
        [eventId]: !prevResponses[eventId],
      };
      AsyncStorage.setItem('userResponses', JSON.stringify(newResponses));
      return newResponses;
    });

    // Find the section and event
    let updatedSections = [...sections];
    const sectionIndex = updatedSections.findIndex(
      section => section.title === sectionTitle,
    );
    const eventIndex = updatedSections[sectionIndex].data.findIndex(
      event => event.eventId === eventId,
    );

    if (sectionIndex === -1 || eventIndex === -1) {
      console.error('Event not found');
      return;
    }

    // Toggle attendance and update count
    const event = updatedSections[sectionIndex].data[eventIndex];
    const updatedCount = event.attending ? event.count - 1 : event.count + 1;
    const updatedEvent = {
      ...event,
      attending: !event.attending,
      count: updatedCount,
    };
    updatedSections[sectionIndex].data[eventIndex] = updatedEvent;

    // Firestore document reference using the bar variable
    const eventRef = doc(FIRESTORE, 'Calendar', bar, 'Events', eventId);

    try {
      // Update Firestore
      await updateDoc(eventRef, {
        count: updatedCount,
      });

      // Update state after Firestore update is successful
      setSections(updatedSections);
    } catch (error) {
      console.error('Error updating Firestore:', error);
    }

    setSections(updatedSections);

    // Update AsyncStorage
    try {
      const newResponses = {
        ...userResponses,
        [eventId]: updatedEvent.attending,
      };
      await AsyncStorage.setItem('userResponses', JSON.stringify(newResponses));
      setUserResponses(newResponses);
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }
  };
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    fetchDatesFromFirestore();
    loadUserResponses();
    fetchEventsForDate(today);
  }, []);

  const handleDayPress = day => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    fetchEventsForDate(dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      {selectedDate && (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.eventId + index}
          renderItem={({item, section}) => {
            const isAttending = userResponses[item.eventId] ?? item.attending;
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>
                  {item.date.toDate().toLocaleDateString()}
                </Text>
                <Text style={styles.description}>
                  {item.date.toDate().toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.description}>Attending: {item.count}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toggleAttendance(section.title, item.eventId)}>
                  <Text style={styles.buttonText}>
                    {isAttending ? 'Not Attending' : 'Attend'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#001f3f',
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#001f3f',
    color: 'white',
    padding: 8,
  },
  button: {
    backgroundColor: '#001f3f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CalendarScreen;
