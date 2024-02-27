import React from 'react';
import {View, Button, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ChangePasswordScreen: undefined;
  SetSpecials: undefined;
  // ... other route names
};

type AccountScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ChangePassword'>;
};

const AccountScreen = ({navigation}) => {
  const {signOutUser} = useAuth();

  const {userName} = useAuth();

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };
  const navigateToFeedback = () => {
    navigation.navigate('Feedback'); // Use the correct screen name as defined in your navigator
  };
  const navigateToSetSpecials = () => {
    navigation.navigate('SetSpecials');
  };
  const navigateToDeleteAccount = () => {
    navigation.navigate('Delete'); // Use the correct screen name as defined in your navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hi {userName}</Text>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={navigateToSetSpecials}>
          <Text style={styles.menuItemText}>Set Specials</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToFeedback}>
          <Text style={styles.menuItemText}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={navigateToChangePassword}>
          <Text style={styles.menuItemText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={navigateToDeleteAccount}>
          <Text style={styles.menuItemText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={signOutUser}>
          <Text style={styles.menuItemText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 18,

    padding: 8,
    textAlign: 'center',
    margin: 5,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 16,
    color: '#001f3f',
    textAlign: 'left',
  },
});

export default AccountScreen;
