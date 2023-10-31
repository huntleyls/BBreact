import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {collection, getDocs} from 'firebase/firestore';

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  barName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  time: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default LineTimes;
