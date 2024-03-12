import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../components/screens/Home/Welcome';
import BarLoginScreen from '../components/screens/Home/Barlogin';
import CustomerLoginScreen from '../components/screens/Home/CustomerLogin';
import RegisterScreen from '../components/screens/Home/RegistrationScreen';
import BarRegisterScreen from '../components/screens/Home/BarRegistration';
import ForgotPassword from '../components/screens/Home/ForgotPassword';
import TermsOfServiceScreen from '../components/screens/Home/TermsOfService';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="Welcome"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTintColor: '#001f3f',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="Bar Login"
        component={BarLoginScreen}
        options={{
          headerTitle: ' ',
          headerTintColor: '#001f3f',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="Customer Login"
        component={CustomerLoginScreen}
        options={{
          headerTitle: ' ',
          headerTintColor: '#001f3f',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerTitle: ' ',
          headerTintColor: '#001f3f',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="BarRegisterScreen"
        component={BarRegisterScreen}
        options={{
          headerTitle: ' ',
          headerTintColor: '#001f3f',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTitle: ' ',
          headerTintColor: '#001f3f',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          headerTitle: 'Terms of Service',
          headerTintColor: '#001f3f',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
    </Stack.Navigator>
  );
}
