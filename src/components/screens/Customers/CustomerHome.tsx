import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the customer screens
import CalendarScreen from './Calendar';
import LineTimes from './getLineTime';
import BarTypeSelection from './BarSelection';
import GetSpecials from './getSpecials';
import CustomerAccountScreen from './CustomerAccount';

const CustomerTab = createBottomTabNavigator();

const CustomerTabNavigator = () => {
  return (
    <CustomerTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Calendar') {
            iconName = 'calendar';
          } else if (route.name === 'Line Times') {
            iconName = 'clock-o';
          } else if (route.name === 'Bars') {
            iconName = 'glass';
          } else if (route.name === 'Account') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffdc00',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#001f3f',
      })}>
      <CustomerTab.Screen name="Line Times" component={LineTimes} />
      <CustomerTab.Screen name="Calendar" component={CalendarScreen} />
      <CustomerTab.Screen name="Bars" component={BarTypeSelection} />
      <CustomerTab.Screen name="Account" component={CustomerAccountScreen} />
    </CustomerTab.Navigator>
  );
};

export default CustomerTabNavigator;
