import React, {useState} from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {FIREBASE_AUTH} from '../../../../FirebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

type CustomerLoginScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const CustomerLoginScreen: React.FC<CustomerLoginScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password,
      );
      console.log(response);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not registered');
      } else {
        setError('An error occurred during sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#001f3f" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Sign In</Text>
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

export default CustomerLoginScreen;
