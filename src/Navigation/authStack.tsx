import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../components/screens/Home/Welcome';
import BarLoginScreen from '../components/screens/Home/Barlogin';
import CustomerLoginScreen from '../components/screens/Home/CustomerLogin';
import RegisterScreen from '../components/screens/Home/RegistrationScreen';
import BarRegisterScreen from '../components/screens/Home/BarRegistration';
import ForgotPassword from '../components/screens/Home/ForgotPassword';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Welcome" component={HomeScreen} />
      <Stack.Screen name="Bar Login" component={BarLoginScreen} />
      <Stack.Screen name="Customer Login" component={CustomerLoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="BarRegisterScreen" component={BarRegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
