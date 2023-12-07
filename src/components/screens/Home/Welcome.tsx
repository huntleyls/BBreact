import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};
const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../images/boone-bars.png')}
        style={styles.image} // Updated this line
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Bar Login')}>
        <Text style={styles.buttonText}>Bar Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Customer Login')}>
        <Text style={styles.buttonText}>Customer Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffdc00',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  button: {
    width: '100%',
    backgroundColor: '#001f3f',
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default HomeScreen;
