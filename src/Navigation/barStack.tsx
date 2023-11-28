import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../components/screens/Bars/BarHome';
import ChangePassword from '../components/screens/Bars/ChangePassword';
import SetSpecials from '../components/screens/Bars/setSpecials';
import FeedbackComponent from '../components/screens/Bars/Feedback';

const Stack = createStackNavigator();

export default function BarStack() {
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
        name="SetSpecials"
        component={SetSpecials}
        options={{title: 'Set Specials'}}
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
    </Stack.Navigator>
  );
}
