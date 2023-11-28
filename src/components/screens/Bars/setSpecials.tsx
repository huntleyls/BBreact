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
  TouchableOpacity,
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
  deleteDoc,
} from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

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

      fetchData();
    }
  };

  const deleteItem = async (dayy: string, itemId: string) => {
    if (barType) {
      // Ensure barType is accessible in this scope.
      const specialsRef = doc(FIRESTORE, 'Specials', barType);
      const itemDocRef = doc(specialsRef, 'days', dayy, 'items', itemId);

      // Delete the item from Firestore
      await deleteDoc(itemDocRef);

      // Update the UI by fetching the data again
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
        const specialsRef = doc(FIRESTORE, 'Specials', barType);
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
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={item => item.itemId}
        renderItem={({item, section}) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>Description: {item.description}</Text>
            </View>
            <Icon
              name="trash-outline"
              size={24}
              color="red"
              onPress={() =>
                deleteItem(section.title.toLowerCase(), item.itemId)
              }
            />
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
    marginTop: 10,
    marginBottom: 10,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  // New styles for your existing components
  input: {
    // Define styles for your TextInput components
    borderBottomWidth: 1,
    borderColor: '#001f3f',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  formContainer: {
    // Style for the form container
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContainer: {
    // Style for each item in the list
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemInfo: {
    // Styles for the text inside each item
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    // Styles for the item name
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dayHeading: {
    // Styles for day headings in your SectionList
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SetSpecials;
