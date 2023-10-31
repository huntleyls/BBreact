import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  ViewStyle,
  Alert,
} from 'react-native';
import {FIREBASE_AUTH, FIRESTORE} from '../../../../FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';

type BarRegisterScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const BarRegisterScreen: React.FC<BarRegisterScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [bar, setBar] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE;

  const register = async () => {
    setLoading(true);
    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(user);
      // Create new user document in Firestore with user data
      await setDoc(doc(firestore, 'users', user.uid), {
        Email: email,
        userType: 'customer',
        firstName: firstName,
        lastName: lastName,
        userID: user.uid,
        Bar: bar,
      });
      // Sign out the user after registration
      await auth.signOut();
      // Navigate to login screen upon successful registration
      navigation.navigate('Customer Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email is already in use');
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#f5f5f5',
    } as ViewStyle,
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 8,
      marginBottom: 10,
      borderRadius: 5,
    },
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bar"
        value={bar}
        onChangeText={setBar}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Register" onPress={register} />
      )}
    </View>
  );
};

export default BarRegisterScreen;
