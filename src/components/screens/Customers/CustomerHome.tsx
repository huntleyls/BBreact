import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type CustomerHomeProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const CustomerHome = ({navigation}: CustomerHomeProps) => {
  const handleCalendarPress = () => {
    navigation.navigate('Calendar');
  };

  const handleLineTimesPress = () => {
    navigation.navigate('LineTimes'); // Ensure 'LineTimes' is the correct route name for your LineTimes page.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Customer Home</Text>
      <TouchableOpacity style={styles.button} onPress={handleCalendarPress}>
        <Text style={styles.buttonText}>Go to Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLineTimesPress}>
        <Text style={styles.buttonText}>Go to Line Times</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomerHome;
