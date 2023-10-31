import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SectionList} from 'react-native';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {getDocs, collection, doc} from 'firebase/firestore';

interface Item {
  itemId: string;
  name: string;
  price: number;
  description: string;
}

interface DailyItems {
  [day: string]: Item[];
}

const GetSpecials: React.FC = () => {
  const [weeklyItems, setWeeklyItems] = useState<DailyItems>({});

  const sections = Object.entries(weeklyItems).map(([days, items]) => ({
    title: days.charAt(0).toUpperCase() + days.slice(1),
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
    };

    fetchData();
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  itemName: {
    fontWeight: 'bold',
  },
  dayHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default GetSpecials;
