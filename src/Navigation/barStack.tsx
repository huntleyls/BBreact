import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import BarHome from '../components/screens/Bars/BarHome';
import SetLineTime from '../components/screens/Bars/setLineTime';
import NumberComponent from '../components/screens/Bars/HeadCount';
import SetSpecials from '../components/screens/Bars/setSpecials';

const Stack = createStackNavigator();

export default function barStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="BarHome" component={BarHome} />
      <Stack.Screen name="SetLineTime" component={SetLineTime} />
      <Stack.Screen name="NumberComponent" component={NumberComponent} />
      <Stack.Screen name="SetSpecials" component={SetSpecials} />
    </Stack.Navigator>
  );
}
