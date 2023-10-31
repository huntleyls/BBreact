import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {FIREBASE_AUTH} from '../../../../FirebaseConfig';
import {sendPasswordResetEmail} from 'firebase/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handlePasswordReset = async () => {
    const loweredEmail = email.toLowerCase();
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, loweredEmail);
      setMessage(
        'If the email is found, you will receive a password reset link shortly.',
      );
      Alert.alert(
        'Success',
        'If the email is found, you will receive a password reset link shortly.',
      );
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('An error occurred. Please try again later.');
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Submit" onPress={handlePasswordReset} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  message: {
    marginTop: 20,
  },
});

export default ForgotPassword;
