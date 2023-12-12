import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Details from './src/screens/Details';
import AddUser from './src/screens/AddUser';
import UserRatio from './src/screens/UserRatio';
import Resources from './src/screens/Resources';
import AddResources from './src/screens/AddResources';
import AddDesease from './src/screens/AddDesease';
import ChatScreen from './src/screens/ChatScreen';
import ShelterTasks from './src/screens/ShelterTasks';
import AddVolunteer from './src/screens/AddVolunteer';
import LoginForm from './src/screens/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTask from './src/screens/AddTask';



const Stack = createNativeStackNavigator();
const App = () => {
  const [loggedIn,setLoggedIn]=useState(true);
  // useEffect(()=>{
  //   const getStorageData=async()=>{
  //     const storedUserId =await  AsyncStorage.getItem('userId');
  //     const storedPassword = await AsyncStorage.getItem('password');
  //     console.log(storedUserId)
  //     if(storedUserId){setLoggedIn(true)}
  //   }
  //   getStorageData();
  // },[])
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={loggedIn?'Home':'Login'}>
    <Stack.Screen
          name="Home"
          options={{ setLoggedIn: setLoggedIn }}
        >
          {(props) => <Home {...props} setLoggedIn={setLoggedIn}/>}
        </Stack.Screen>
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="UserRatio" component={UserRatio} />
      <Stack.Screen name="Resources" component={Resources} />
      <Stack.Screen name="AddResources" component={AddResources} />
      <Stack.Screen name="AddDesease" component={AddDesease} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ShelterTasks" component={ShelterTasks} />
      <Stack.Screen name="AddVolunteer" component={AddVolunteer} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen
          name="Login"
          options={{ setLoggedIn: setLoggedIn }}
        >
          {(props) => <LoginForm {...props} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}
        </Stack.Screen>
           {/* Render the component with additional props */}
     
    
    </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

export default App;
