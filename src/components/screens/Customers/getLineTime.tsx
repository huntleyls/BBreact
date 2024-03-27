import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {FIRESTORE} from '../../../../FirebaseConfig';
import {collection, getDocs} from 'firebase/firestore';
import SmallBannerAd2 from '../../common/ads/SmallBannerAd2';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ViewCalendarScreen: undefined;
  SetSpecials: undefined;
  // ... other route names
};
type getLineTimeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddLineTime'>;
};

const LineTimes: React.FC<getLineTimeProps> = ({navigation}) => {
  const [lineTimes, setLineTimes] = useState<Array<any>>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useLayoutEffect(() => {
    const currentHour = new Date().getHours();

    // If the current hour is between 8 PM and 2 AM
    if (currentHour >= 10 || currentHour < 2) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddLineTime')}
            style={styles.button}>
            <Text style={styles.buttonText}>View Calendar</Text>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null, // No button outside the time range
      });
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <SmallBannerAd2 />
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
    paddingTop: 16, // Increased top padding to bring the header down
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
