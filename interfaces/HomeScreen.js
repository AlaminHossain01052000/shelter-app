import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ username }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/welcome.png')} // Replace with the actual path to your image
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome @{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#015C92',
    padding:"50px"
  },
  image: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"white"
  },
});

export default HomeScreen;
