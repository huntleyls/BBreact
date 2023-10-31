import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  SectionList,
  TextInput,
} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  addDoc,
} from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';

interface Item {
  itemId: string;
  name: string;
  price: number;
  description: string;
}

interface DailyItems {
  [day: string]: Item[];
}

const SetSpecials: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState('');
  const {barType} = useAuth();
  const [weeklyItems, setWeeklyItems] = useState<DailyItems>({});

  const daysOfWeekList = [
    {value: 'sunday', label: 'Sunday'},
    {value: 'monday', label: 'Monday'},
    {value: 'tuesday', label: 'Tuesday'},
    {value: 'wednesday', label: 'Wednesday'},
    {value: 'thursday', label: 'Thursday'},
    {value: 'friday', label: 'Friday'},
    {value: 'saturday', label: 'Saturday'},
  ];
  const sections = Object.entries(weeklyItems).map(([days, items]) => ({
    title: days.charAt(0).toUpperCase() + days.slice(1),
    data: items,
  }));
  const addItem = async () => {
    if (barType) {
      const specialsRef = doc(FIRESTORE, 'Specials', barType);
      const itemsCollectionRef = collection(specialsRef, 'days', day, 'items');

      await addDoc(itemsCollectionRef, {
        name,
        price: parseFloat(price),
        description,
      });

      setName('');
      setPrice('');
      setDescription('');
      setDay('');

      fetchData();
    }
  };

  const fetchData = useCallback(async () => {
    if (barType) {
      const daysOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];
      let allItems: DailyItems = {};

      for (let days of daysOfWeek) {
        const specialsRef = doc(FIRESTORE, 'Specials', 'BS');
        const itemsCollectionRef = collection(
          specialsRef,
          'days',
          days,
          'items',
        );

        const querySnapshot = await getDocs(itemsCollectionRef);

        let dayItems: Item[] = [];
        querySnapshot.forEach(doc => {
          const itemData = doc.data();
          dayItems.push({
            itemId: doc.id,
            name: itemData.name,
            price: itemData.price,
            description: itemData.description,
          });
        });
        allItems[days] = dayItems;
      }

      setWeeklyItems(allItems);
    }
  }, [barType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Item Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <SelectDropdown
          data={daysOfWeekList}
          onSelect={(selectedItem, index) => setDay(selectedItem.value)}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.label;
          }}
          rowTextForSelection={(item, index) => {
            return item.label;
          }}
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={item => item.itemId}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Description: {item.description}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.dayHeading}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6', // Light grayish background
  },
  formContainer: {
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // White background for the form
    padding: 20,
    shadowColor: '#000', // Drop shadow for form container
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
    borderColor: '#E5E7EB', // Light gray border for inputs
  },
  dayHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111827', // Almost black text color
    backgroundColor: '#D1D5DB', // Light gray background for day headings
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // White background for each item
    shadowColor: '#000', // Drop shadow for items
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default SetSpecials;
