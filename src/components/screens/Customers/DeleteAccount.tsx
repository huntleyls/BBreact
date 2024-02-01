import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../common/hooks/useAuth';
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';

const DeleteAccountScreen = () => {
  const {userEmail} = useAuth();
  const auth = getAuth();
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDeleteAccount = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'User email is not available.');
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Both password fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(userEmail, password);

      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      Alert.alert('Success', 'Account deleted successfully', [
        {text: 'OK', onPress: () => navigation.navigate('Login')},
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text>All Account Data Will Be Deleted</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#000000"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#000000"
        />

        <View style={styles.button}>
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            color="white"
          />
        </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001f3f',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },

  button: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 100,
  },
});

export default DeleteAccountScreen;
