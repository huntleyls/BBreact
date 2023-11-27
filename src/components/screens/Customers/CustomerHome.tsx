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
          } else if (route.name === 'LineTimes') {
            iconName = 'clock-o';
          } else if (route.name === 'BarSelection') {
            iconName = 'glass';
          } else if (route.name === 'CustomerAccount') {
            iconName = 'star';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <CustomerTab.Screen name="Calendar" component={CalendarScreen} />
      <CustomerTab.Screen
        name="LineTimes"
        component={LineTimes}
        options={{headerShown: false}}
      />
      <CustomerTab.Screen
        name="BarSelection"
        component={BarTypeSelection}
        options={{headerShown: false}}
      />
      <CustomerTab.Screen
        name="CustomerAccount"
        component={CustomerAccountScreen}
      />
    </CustomerTab.Navigator>
  );
};

export default CustomerTabNavigator;
