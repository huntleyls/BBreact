import React, {useState} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

const ChangePasswordScreen = () => {
  const {userEmail} = useAuth();
  const auth = getAuth();
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'User email is not available.');
      return;
    }

    if (!currentPassword) {
      Alert.alert('Error', 'Current password is required.');
      return;
    }

    if (!newPassword) {
      Alert.alert('Error', 'New password is required.');
      return;
    }

    if (!confirmNewPassword) {
      Alert.alert('Error', 'Confirm new password is required.');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Error', 'New password cannot be the same as current.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    try {
      const user = auth.currentUser; // Get the current user
      const credential = EmailAuthProvider.credential(
        userEmail,
        currentPassword,
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert('Success', 'Password changed successfully', [
        {text: 'OK', onPress: () => navigation.goBack()}, // Redirect after success
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
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholderTextColor="#000000"
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#000000"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholderTextColor="#000000"
        />

        <View style={styles.button}>
          <Button
            title="Change Password"
            onPress={handleChangePassword}
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
    backgroundColor: '#001f3f',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 100,
  },
});

export default ChangePasswordScreen;
