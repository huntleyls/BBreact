import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SectionList} from 'react-native';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {getDocs, collection, doc} from 'firebase/firestore';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../../../Navigation/userStack';

export type GetSpecialsRouteParams = {
  bartype: string;
};

interface Item {
  itemId: string;
  name: string;
  price: number;
  description: string;
}

interface DailyItems {
  [day: string]: Item[];
}

interface GetSpecialsProps {
  route: RouteProp<StackParamList, 'GetSpecials'>;
}

const GetSpecials: React.FC<GetSpecialsProps> = ({route}) => {
  const initialDailyItems: DailyItems = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };

  const [weeklyItems, setWeeklyItems] = useState<DailyItems>(initialDailyItems);
  const bartype = route.params.bartype;

  const sections = Object.entries(weeklyItems).map(([day, items]) => ({
    title: day.charAt(0).toUpperCase() + day.slice(1),
    data: items,
  }));

  useEffect(() => {
    const fetchData = async () => {
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

      for (let day of daysOfWeek) {
        const specialsRef = doc(FIRESTORE, 'Specials', bartype);
        const itemsCollectionRef = collection(
          specialsRef,
          'days',
          day,
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
        allItems[day] = dayItems;
      }

      setWeeklyItems(prevItems => ({...prevItems, ...allItems}));
    };

    fetchData();
  }, [bartype]);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Weekly Specials</Text>
      <SectionList
        sections={sections}
        keyExtractor={item => item.itemId}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>
              ${item.price} {item.name}
            </Text>
            {item.description !== '' && (
              <Text style={styles.description}>
                Description: {item.description}
              </Text>
            )}
          </View>
        )}
        renderSectionHeader={({section: {title, data}}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.dayHeading}>{title}</Text>
            {data.length === 0 && (
              <Text style={styles.noItemsText}>No Specials Today.</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', // Light background for a clean look
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3a3a3a', // Darker color for contrast
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: 20,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f7f7f7', // Slightly off-white for the item background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light border for subtle separation
    shadowColor: '#000', // Adding a shadow for depth
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation for shadow (Android)
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600', // Semi-bold for readability
    color: '#2e2e2e', // Slightly softer than pure black
    marginBottom: 5, // Space between title and description
  },
  description: {
    fontSize: 16,
    color: '#4a4a4a', // Grey for a softer look
  },
  dayHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a3a3a',
    marginBottom: 10,
  },
  sectionHeader: {
    backgroundColor: '#e8e8e8', // Different background for section headers
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, // Space between sections
  },
  noItemsText: {
    fontSize: 16,
    color: '#6a6a6a', // Noticeable but not too stark
  },
});

export default GetSpecials;
