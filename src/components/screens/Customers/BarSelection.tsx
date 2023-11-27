import React, {useState} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';

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
  name: string;
  hours: BarHours;
  phone: string;
  special: string;
};

const barsData: BarInfo[] = [
  {
    bartype: 'BS',
    name: 'Boone Saloon',
    hours: {
      Sunday: '9 AM - 2 AM',
      Monday: '9 AM - 2 AM',
      Tuesday: '9 AM - 2 AM',
      Wednesday: '9 AM - 2 AM',
      Thursday: '9 AM - 2 AM',
      Friday: '9 AM - 2 AM',
      Saturday: '9 AM - 2 AM',
    },
    phone: '123-456-7890',
    special: 'Happy Hour 4-6 PM',
  },
  {
    bartype: 'RSAH',
    name: 'Rivers Street Ale House',
    hours: {
      Sunday: '9 AM - 2 AM',
      Monday: '9 AM - 2 AM',
      Tuesday: '9 AM - 2 AM',
      Wednesday: '9 AM - 2 AM',
      Thursday: '9 AM - 2 AM',
      Friday: '9 AM - 2 AM',
      Saturday: '9 AM - 2 AM',
    },
    phone: '123-456-7890',
    special: 'Happy Hour 4-6 PM',
  },
  {
    bartype: 'HS',
    name: 'Howard Station',
    hours: {
      Sunday: '9 AM - 2 AM',
      Monday: '9 AM - 2 AM',
      Tuesday: '9 AM - 2 AM',
      Wednesday: '9 AM - 2 AM',
      Thursday: '9 AM - 2 AM',
      Friday: '9 AM - 2 AM',
      Saturday: '9 AM - 2 AM',
    },
    phone: '123-456-7890',
    special: 'Happy Hour 4-6 PM',
  },
  {
    bartype: 'TAPP',
    name: 'The Tapp Room',
    hours: {
      Sunday: '9 AM - 2 AM',
      Monday: '9 AM - 2 AM',
      Tuesday: '9 AM - 2 AM',
      Wednesday: '9 AM - 2 AM',
      Thursday: '9 AM - 2 AM',
      Friday: '9 AM - 2 AM',
      Saturday: '9 AM - 2 AM',
    },
    phone: '123-456-7890',
    special: 'Happy Hour 4-6 PM',
  },
  // ... other bars
];

const BarTypeSelection = ({navigation}: BarSelectionProps) => {
  const [expandedBarType, setExpandedBarType] = useState<string | null>(null);

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
          {Object.entries(bar.hours).map(([day, hours]) => (
            <Text key={day}>
              {day}: {hours}
            </Text>
          ))}
          <Text>Phone: {bar.phone}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {barsData.map(bar => (
        <View key={bar.bartype}>
          <Text>{bar.name}</Text>
          <Button
            title={`Go to Specials`}
            onPress={() =>
              navigation.navigate('GetSpecials', {bartype: bar.bartype})
            }
          />
          <TouchableOpacity onPress={() => toggleDetails(bar.bartype)}>
            <Text>Details</Text>
          </TouchableOpacity>
          {renderBarDetails(bar)}
        </View>
      ))}
    </View>
  );
};

export default BarTypeSelection;
