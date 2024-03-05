import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your tab screens
import SetLineTime from './setLineTime';
import NumberComponent from './HeadCount';
import SetCalendar from './SetCalendar';
import Account from './Account'; // Import the new Account component

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Line Time') {
            iconName = 'timer-sand';
          } else if (route.name === 'Head Count') {
            iconName = 'counter';
          } else if (route.name === 'Account') {
            iconName = 'account-circle-outline'; // Choose an appropriate icon for the account tab
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffdc00',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#001f3f',
      })}>
      <Tab.Screen
        name="Line Time"
        component={SetLineTime}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Head Count"
        component={NumberComponent}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen name="Account" component={Account} />
      {/* Add the new Account tab */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
