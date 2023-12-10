import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus, faUsers, faHandsHelping, faPlus, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
const IconButton = ({ title, onPress, icon, color }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <FontAwesomeIcon icon={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
const Home = ({navigation }) => {
  return (
    <ScrollView>
      <View  style={styles.container}>
      <Image
        source={require('../../assets/welcome.png')} // Replace with the actual path to your image
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome</Text>
      <IconButton title="Add a User" onPress={()=>navigation.push('AddUser')} icon={faUserPlus} color="#3498db" />
      <IconButton title="User Ratio"  onPress={()=>navigation.push('UserRatio')} icon={faUsers} color="#2ecc71" />
      <IconButton title="Resources" icon={faHandsHelping} color="#f39c12" />
      <IconButton title="Add Disease"  icon={faPlus} color="#e74c3c" />
      <IconButton title="Give Attendance"  icon={faCalendarCheck} color="#9b59b6" />
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
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
  
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  icon: {
    fontSize: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Home;
