import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginForm = (props) => {
    const {navigation,setLoggedIn,loggedIn}=props;
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
// useEffect(()=>{
//     const getStorageData=async()=>{
//     const storedUserId = await AsyncStorage.getItem('userId');
//       const storedPassword = await AsyncStorage.getItem('password');
//       console.log(storedUserId)
//     }
//     getStorageData();
    
   
// },[])
  const handleSubmit = async() =>{
    // Add your login logic here
    
    console.log('User ID:', userId);
    try {
        await fetch(`http://localhost:5000/users/${userId}`)
    .then(res=>res.json())
    .then(async(data)=>{
        console.log(data)
        if(data.password===password){
            await AsyncStorage.setItem('userId', userId);
            await AsyncStorage.setItem('password', password);
            setLoggedIn(true)
            navigation.push('Home')
            console.log("Login Success")
        }
    })
    } catch (error) {
        console.log(error)
    }
    
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Form</Text>

      {/* User ID input field */}
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginForm;
