import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import SmallBannerAd from '../../common/ads/SmallBannerAd';
import openMap from 'react-native-open-maps';

export type GetSpecialsRouteParams = {
  bartype: string;
};

type BarSelectionProps = {
  navigation: {
    navigate: (screen: string, params?: {bartype: string}) => void;
  };
  bartype?: string;
};
export type BarHours = {
  [day: string]: string;
};

export type BarInfo = {
  bartype: string;
  phone: string;
  name: string;
  hours: BarHours;
  address: string;
};

const barsData: BarInfo[] = [
  {
    bartype: 'BS',
    name: 'Boone Saloon',
    phone: '(828) 264-1811',
    hours: {
      Sunday: '12 PM - 2 AM',
      Monday: '12 PM - 2 AM',
      Tuesday: '12 PM - 2 AM',
      Wednesday: '12 PM - 2 AM',
      Thursday: '12 PM - 2 AM',
      Friday: '12 PM - 2 AM',
      Saturday: '12 PM - 2 AM',
    },
    address: '489 W King St, Boone, NC 28607',
  },
  {
    bartype: 'LILY',
    name: "Lily's snack bar",
    phone: '(828) 386-6411',
    hours: {
      Sunday: '12 PM - 2 AM',
      Monday: '12 PM - 2 AM',
      Tuesday: '12 PM - 2 AM',
      Wednesday: '12 PM - 2 AM',
      Thursday: '12 PM - 2 AM',
      Friday: '12 PM - 2 AM',
      Saturday: '12 PM - 2 AM',
    },
    address: '455 Blowing Rock Rd, Boone, NC 28607',
  },
  {
    bartype: 'FE',
    name: 'Fizz ED',
    phone: '(828) 832-8102',
    hours: {
      Sunday: '11 AM - 12 AM',
      Monday: '11 AM - 12 AM',
      Tuesday: '11 AM - 12 AM',
      Wednesday: '11 AM - 12 AM',
      Thursday: '11 AM - 12 AM',
      Friday: '11 AM - 12 AM',
      Saturday: '11 AM - 12 AM',
    },
    address: '260 Howard St, Boone, NC 28607',
  },
  {
    bartype: 'HS',
    name: 'Howard Station',
    phone: '(828) 865-1122',
    hours: {
      Sunday: '12 PM - 11 PM',
      Monday: 'Closed',
      Tuesday: '9 AM - 2 AM',
      Wednesday: 'Closed',
      Thursday: '5 AM - 11 PM',
      Friday: '5 PM - 11 PM',
      Saturday: '12 PM - 11 PM',
    },
    address: '268 Howard St, Boone, NC 28607',
  },
  {
    bartype: 'RSAH',
    name: 'Rivers Street Ale House',
    phone: '(828) 264-8100',
    hours: {
      Sunday: '11 AM - 12 AM',
      Monday: '11 AM - 2 AM',
      Tuesday: '11 AM - 2 AM',
      Wednesday: '11 AM - 2 AM',
      Thursday: '11 AM - 2 AM',
      Friday: '11 AM - 2 AM',
      Saturday: '11 AM - 2 AM',
    },
    address: '957 Rivers St, Boone, NC 28607',
  },

  /*{
    bartype: 'TAPP',
    name: 'The Tapp Room',
    phone: '123-456-7890',
    hours: {
      Sunday: '9 AM - 12 AM',
      Monday: 'Closed',
      Tuesday: '3 PM - 12 AM',
      Wednesday: '11:30 AM - 12 AM',
      Thursday: '11:30 AM - 2 AM',
      Friday: '11:30 AM - 2 AM',
      Saturday: '11:30 AM - 2 AM',
    },
    address: '421 Blowing Rock Rd, Boone, NC 28607',
  },*/
];

const BarTypeSelection = ({navigation}: BarSelectionProps) => {
  const [expandedBarType, setExpandedBarType] = useState<string | null>(null);

  const makeCall = phoneNumber => {
    // Format phone number for tel protocol
    const formattedNumber = phoneNumber.replace(/[^0-9]/g, '');
    const url = `tel:${formattedNumber}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => Alert.alert('An error occurred', err));
  };

  const openMapToBar = (address: string) => {
    openMap({query: address});
  };

  const toggleDetails = (bartype: string) => {
    if (expandedBarType === bartype) {
      setExpandedBarType(null);
    } else {
      setExpandedBarType(bartype);
    }
  };

  const renderBarDetails = (bar: BarInfo) => {
    if (expandedBarType === bar.bartype) {
      return (
        <View style={{margin: 10}}>
          <Text style={styles.header}>Address:</Text>
          <TouchableOpacity onPress={() => openMapToBar(bar.address)}>
            <Text style={styles.phone}>{bar.address.split(',')[0].trim()}</Text>
            <Text style={styles.phone}>
              {bar.address.split(',').slice(1).join(', ').trim()}
            </Text>
          </TouchableOpacity>
          <Text style={styles.header}>Phone:</Text>
          <TouchableOpacity onPress={() => makeCall(bar.phone)}>
            <Text style={styles.phone}>{bar.phone}</Text>
          </TouchableOpacity>

          <Text style={styles.header}>Hours:</Text>
          {Object.entries(bar.hours).map(([day, hours]) => (
            <View style={styles.dayRow} key={day}>
              <Text style={styles.day}>{day}:</Text>
              <Text style={styles.hours}>{hours}</Text>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      {barsData.map((bar, index) => (
        <React.Fragment key={bar.bartype}>
          <View style={styles.card}>
            <Text style={styles.barName}>{bar.name}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('GetSpecials', {bartype: bar.bartype})
              }>
              <Text style={styles.headerText}>Specials</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleDetails(bar.bartype)}>
              <Text style={styles.headerText}>Details</Text>
            </TouchableOpacity>
            {renderBarDetails(bar)}
          </View>

          {index % 2 === 1 && <SmallBannerAd />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

export default BarTypeSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#001f3f',
    padding: 8,
    textAlign: 'center',
    margin: 5,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  barName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#001f3f',
  },
  time: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#001f3f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
  },
  link: {
    color: '#0000FF',
    marginLeft: 10,
  },
  content: {
    marginLeft: 10,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  day: {
    marginRight: 10,
  },
  hours: {},
  phone: {
    color: '#0000FF',
    marginLeft: 20,
  },
  header: {
    fontWeight: 'bold',
  },
});
