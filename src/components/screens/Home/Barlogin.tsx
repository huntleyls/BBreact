import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {FIREBASE_AUTH} from '../../../../FirebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

type BarLoginScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const BarLoginScreen: React.FC<BarLoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password,
      );
      console.log(response);
      // Navigate to next screen or handle login success
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      Alert.alert('Login Failed', error.message);
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
        <Text style={styles.title}>Bar Login</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          placeholder="Password"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={setPassword}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        {loading ? (
          <ActivityIndicator size="large" color="#001f3f" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.linkButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
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
  linkButton: {
    alignItems: 'center',
    marginBottom: 5,
  },
  linkButtonText: {
    color: '#001f3f',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default BarLoginScreen;
