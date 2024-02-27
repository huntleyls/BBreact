import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {FIRESTORE as db} from '../../../../FirebaseConfig';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {
  getDocs,
  collection,
  addDoc,
  doc,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {isAfter, startOfToday} from 'date-fns';
import {StackNavigationProp} from '@react-navigation/stack';

interface Event {
  eventId: string;
  name: string;
  date: Timestamp;
  description: string;
  count: number;
}
type RootStackParamList = {
  ViewCalendarScreen: undefined;
  SetSpecials: undefined;
  // ... other route names
};
type SetCalendarProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ViewCalendarScreen'>;
};

const SetCalendar: React.FC<SetCalendarProps> = ({navigation}) => {
  const {barType} = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const displayDate = selectedDateTime.toISOString().split('T')[0];
  const hours = selectedDateTime.getHours();
  const minutes = selectedDateTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert to 12 hour format
  const displayTime = `${String(displayHours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')} ${ampm}`;

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

  const postEvent = async () => {
    if (eventName && barType) {
      const eventRef = collection(db, 'Calendar', barType, 'Events');
      const timestamp = Timestamp.fromDate(selectedDateTime); // Use selectedDateTime directly
      const barName = getBarName(barType);
      try {
        await addDoc(eventRef, {
          name: eventName,
          date: timestamp,
          description: eventDescription,
          count: 0,
          barName: barName,
        });

        console.log('Event added!');
        setEventName('');
        setEventDate('');
        setEventDescription('');

        setSelectedDateTime(new Date());

        fetchEvents(); // Refresh the events list after adding
      } catch (error) {
        console.error('Error adding event: ', error);
      }
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewCalendarScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>View Calendar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchEvents = useCallback(async () => {
    if (barType) {
      const eventsRef = collection(FIRESTORE, 'Calendar', barType, 'Events');
      const querySnapshot = await getDocs(eventsRef);

      const fetchedEvents: Event[] = [];
      querySnapshot.forEach(doc => {
        const eventData = doc.data();
        fetchedEvents.push({
          eventId: doc.id,
          name: eventData.name,
          date: eventData.date,
          count: eventData.count,
          description: eventData.description,
        });
      });

      setEvents(fetchedEvents);
    }
  }, [barType]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, barType]);

  const onDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || selectedDateTime;
    setSelectedDateTime(currentDate);
  };

  const onTimeChange = (_event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || selectedDateTime;

    setSelectedDateTime(currentTime);

    setEventDate(
      `${selectedDateTime.toISOString().split('T')[0]} ${currentTime
        .toTimeString()
        .slice(0, 5)}`,
    );
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const eventRef = doc(db, 'Calendar', barType, 'Events', eventId);
      await deleteDoc(eventRef);
      console.log('Event deleted!');
      fetchEvents(); // Refresh the events list after deletion
    } catch (error) {
      console.error('Error deleting event: ', error);
    }
  };

  const confirmDelete = eventId => {
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => deleteEvent(eventId)},
    ]);
  };

  const today = startOfToday(); // Get the start of today's date
  const futureEvents = events.filter(
    item => item.date && isAfter(item.date.toDate(), today),
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
            style={styles.input}
            placeholderTextColor="#000000"
          />

          <View style={styles.centeredContainer}>
            <DateTimePicker
              value={selectedDateTime}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          </View>
          <View style={styles.centeredContainer}>
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          </View>

          {/* Display Selected Date and Time */}
          <Text style={styles.selectedDateTime}>
            Selected: {displayDate} {displayTime}
          </Text>

          <TextInput
            placeholder="Description"
            value={eventDescription}
            onChangeText={setEventDescription}
            style={styles.input}
            placeholderTextColor="#000000"
          />
          <Button title="Post Event" onPress={postEvent} />
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={futureEvents}
        keyExtractor={item => item.eventId}
        renderItem={({item}) => {
          const eventDate = item.date ? item.date.toDate() : null;
          return (
            <View style={styles.eventContainer}>
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text>
                  Date: {eventDate ? eventDate.toLocaleDateString() : ''}
                </Text>
                <Text>
                  Time: {eventDate ? eventDate.toLocaleTimeString() : ''}
                </Text>
                <Text>Description: </Text>
                <Text>{item.description}</Text>
                <Text>Attendance: {item.count}</Text>
              </View>
              <Icon
                name="delete"
                size={24}
                color="#FF0000"
                onPress={() => confirmDelete(item.eventId)}
                style={styles.deleteIcon}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  formContainer: {
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    borderColor: '#E5E7EB',
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  selectedDateTime: {
    marginVertical: 15,
    fontSize: 16,
    color: '#111827',
    alignSelf: 'center',
  },
  button: {
    // You can adjust the padding to change the size
    paddingVertical: 5, // Smaller vertical padding
    paddingHorizontal: 10, // Smaller horizontal padding to make the button smaller
    marginRight: 10, // Optional: to ensure it doesn't touch the screen edge
    backgroundColor: 'green', // Adjust as needed
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12, // Smaller font size
    color: 'white', // Adjust the color as needed
  },
});

export default SetCalendar;
