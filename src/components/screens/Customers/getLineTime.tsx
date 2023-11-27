import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {collection, getDocs} from 'firebase/firestore';

import SmallBannerAd from '../../common/ads/SmallBannerAd';

const LineTimes: React.FC = () => {
  const [lineTimes, setLineTimes] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const lineTimesCollection = collection(FIRESTORE, 'linetimes');
      const querySnapshot = await getDocs(lineTimesCollection);

      const times: Array<any> = [];
      querySnapshot.forEach(doc => {
        times.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setLineTimes(times);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Line Times</Text>
      <FlatList
        data={lineTimes}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.barName}>{item.BarName}</Text>
            <Text style={styles.time}>
              {item.hours} hours {item.minutes} minutes
            </Text>
          </View>
        )}
      />
      <SmallBannerAd />
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

export default LineTimes;
