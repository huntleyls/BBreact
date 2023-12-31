import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {FIRESTORE as db} from '../../../../FirebaseConfig';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {getDocs, collection, addDoc, Timestamp} from 'firebase/firestore';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Event {
  eventId: string;
  name: string;
  date: Timestamp;
  description: string;
  count: number;
}

const SetCalendar: React.FC = () => {
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
  const deleteEvent = async eventId => {
    try {
      await db
        .collection('Calendar')
        .doc(barType)
        .collection('Events')
        .doc(eventId)
        .delete();
      console.log('Event deleted!');
      fetchEvents(); // Refresh the events list after deleting
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

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Event Name"
          value={eventName}
          onChangeText={setEventName}
          style={styles.input}
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
        />
        <Button title="Post Event" onPress={postEvent} />
      </View>

      <FlatList
        data={events}
        keyExtractor={item => item.eventId}
        renderItem={({item}) => (
          <View style={styles.eventContainer}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventName}>{item.name}</Text>
              <Text>Date: {item.date.toDate().toLocaleDateString()}</Text>
              <Text>Time: {item.date.toDate().toLocaleTimeString()}</Text>
              <Text>Description: {item.description}</Text>
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
        )}
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
});

export default SetCalendar;
