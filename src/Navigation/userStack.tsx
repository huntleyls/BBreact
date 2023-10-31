import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import CustomerHome from '../components/screens/Customers/CustomerHome';
import CalendarScreen from '../components/screens/Customers/Calendar';
import LineTimes from '../components/screens/Customers/getLineTime';

const Stack = createStackNavigator();

export default function userStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="CustomerHome" component={CustomerHome} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="LineTimes" component={LineTimes} />
    </Stack.Navigator>
  );
}
