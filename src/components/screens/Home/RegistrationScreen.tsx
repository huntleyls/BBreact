import React, {useState} from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {FIREBASE_AUTH, FIRESTORE} from '../../../../FirebaseConfig';
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';

type RegisterScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE;

  const register = async () => {
    setLoading(true);
    if (!password) {
      Alert.alert('Error', 'Current password is required.');
      return;
    }

    if (!confirmPassword) {
      Alert.alert('Error', 'new password is required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'passwords do not match.');
      return;
    }
    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password,
      );
      await setDoc(doc(firestore, 'users', user.uid), {
        Email: email.toLowerCase(),
        userType: 'customer',
        firstName: firstName,
        lastName: lastName,
        userID: user.uid,
      });
      // Sign out the user after registration
      await signOut(auth);
      Alert.alert('Registration Successful', 'Please log in.');
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000000"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          placeholderTextColor="#000000"
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#000000"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#000000"
          value={lastName}
          onChangeText={setLastName}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#001f3f" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001f3f',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#001f3f',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#001f3f',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegisterScreen;
