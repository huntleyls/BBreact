import {createStackNavigator} from '@react-navigation/stack';
import CustomerTabNavigator from '../components/screens/Customers/CustomerHome'; // Adjust the path accordingly
import GetSpecials from '../components/screens/Customers/getSpecials'; // Adjust the path accordingly
import {GetSpecialsRouteParams} from '../components/screens/Customers/getSpecials';
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
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="CustomerHome"
        component={CustomerTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="GetSpecials" component={GetSpecials} />
      {/* ... other screens ... */}
    </Stack.Navigator>
  );
}
