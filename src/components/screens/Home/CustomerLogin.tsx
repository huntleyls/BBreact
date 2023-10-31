import React, {useState} from 'react';
import {ActivityIndicator, Button, TextInput, View} from 'react-native';
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
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    const loweredEmail = email.toLowerCase();
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        loweredEmail,
        password,
      );
      console.log(response);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // User has not yet registered, do not sign in
        console.log('User has not yet registered');
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Sign In" onPress={signIn} />
      )}
      <Button
        title="Create Account"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
      <Button
        title="Forgot Password"
        onPress={() => navigation.navigate('ForgotPassword')}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
};

export default CustomerLoginScreen;
