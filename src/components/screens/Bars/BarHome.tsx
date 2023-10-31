import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type BarHomeProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const BarHome = ({navigation}: BarHomeProps) => {
  const handleLinePress = () => {
    navigation.navigate('SetLineTime');
  };

  const handleCountPress = () => {
    navigation.navigate('NumberComponent');
  };

  const handleSpecialsPress = () => {
    navigation.navigate('SetSpecials');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bar Home</Text>
      <TouchableOpacity onPress={handleLinePress}>
        <Text style={styles.button}>Set Line Time</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCountPress}>
        <Text style={styles.button}>Set Line Time</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSpecialsPress}>
        <Text style={styles.button}>Set Specials</Text>
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
    fontWeight: 'bold',
  },
  button: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
  },
});

export default BarHome;
