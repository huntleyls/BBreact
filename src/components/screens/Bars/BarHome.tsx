import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your tab screens
import SetLineTime from './setLineTime';
import NumberComponent from './HeadCount';
import SetSpecials from './setSpecials';
import SetCalendar from './SetCalendar';
import Account from './Account'; // Import the new Account component

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'SetLineTime') {
            iconName = 'timer-sand';
          } else if (route.name === 'NumberComponent') {
            iconName = 'counter';
          } else if (route.name === 'SetSpecials') {
            iconName = 'sale';
          } else if (route.name === 'SetCalendar') {
            iconName = 'calendar';
          } else if (route.name === 'Account') {
            iconName = 'account-circle-outline'; // Choose an appropriate icon for the account tab
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="SetLineTime"
        component={SetLineTime}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NumberComponent"
        component={NumberComponent}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SetSpecials"
        component={SetSpecials}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="SetCalendar" component={SetCalendar} />
      <Tab.Screen name="Account" component={Account} />
      {/* Add the new Account tab */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
