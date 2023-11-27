import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../components/screens/Bars/BarHome';

const Stack = createStackNavigator();

export default function BarStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // This hides the header
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="BarHome" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
