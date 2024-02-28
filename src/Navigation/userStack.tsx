import {createStackNavigator} from '@react-navigation/stack';
import CustomerTabNavigator from '../components/screens/Customers/CustomerHome'; // Adjust the path accordingly
import GetSpecials from '../components/screens/Customers/getSpecials'; // Adjust the path accordingly
import {GetSpecialsRouteParams} from '../components/screens/Customers/getSpecials';
import ChangePassword from '../components/screens/Customers/ChangePassword';
import FeedbackComponent from '../components/screens/Customers/Feedback';
import DeleteAccountScreen from '../components/screens/Customers/DeleteAccount';
type UserStackParamList = {
  CustomerHome: undefined; // No parameters expected for CustomerHome
  GetSpecials: GetSpecialsRouteParams; // Use the type defined earlier
  // ...other screens with their respective param types
};
const Stack = createStackNavigator<UserStackParamList>();

export default function UserStack() {
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
        name="CustomerHome"
        component={CustomerTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetSpecials"
        component={GetSpecials}
        options={{title: 'Specials'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackComponent}
        options={{title: 'Feedback'}}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteAccountScreen}
        options={{title: 'Delete'}}
      />
      {/* ... other screens ... */}
    </Stack.Navigator>
  );
}
