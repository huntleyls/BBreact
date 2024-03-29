import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../components/screens/Bouncers/BarHome';
import ChangePassword from '../components/screens/Bouncers/ChangePassword';
import FeedbackComponent from '../components/screens/Bouncers/Feedback';
import DeleteAccountScreen from '../components/screens/Bouncers/DeleteAccount';

const Stack = createStackNavigator();

export default function BouncerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: '#001f3f', // sets color of back button and header buttons
        headerTitleStyle: {
          color: '#001f3f', // sets color of header title
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="BarHome"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackComponent}
        options={{title: 'Feedback'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteAccountScreen}
        options={{title: 'Delete'}}
      />
    </Stack.Navigator>
  );
}
