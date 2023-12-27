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
import MedicalScreen from './src/screens/MedicalScreen';
import FoodScreen from './src/screens/FoodScreen';
import PatientScreen from './src/screens/PatientsScreen';



const Stack = createNativeStackNavigator();
const App = () => {
  const [loggedIn,setLoggedIn]=useState(-1);
  console.log(loggedIn)
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
    <Stack.Navigator initialRouteName={loggedIn!=-1?'Home':'Login'}>
    <Stack.Screen
          name="Home"
          options={{ setLoggedIn: setLoggedIn }}
        >
          {(props) => <Home {...props} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}
        </Stack.Screen>
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="UserRatio" component={UserRatio} />
      <Stack.Screen name="Resources" component={Resources} />
      <Stack.Screen name="AddResources" component={AddResources} />
      <Stack.Screen name="AddDesease" component={AddDesease} />
      <Stack.Screen
          name="ChatScreen"
          options={{ loggedIn: loggedIn }}
        >
          {(props) => <ChatScreen {...props}  loggedIn={loggedIn}/>}
        </Stack.Screen>
      <Stack.Screen
          name="ShelterTasks"
          options={{ setLoggedIn: setLoggedIn }}
        >
          {(props) => <ShelterTasks {...props} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}
        </Stack.Screen>
      <Stack.Screen name="AddVolunteer" component={AddVolunteer} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen
          name="Login"
          options={{ setLoggedIn: setLoggedIn }}
        >
          {(props) => <LoginForm {...props} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}
        </Stack.Screen>
        <Stack.Screen name="MedicalScreen" component={MedicalScreen} />
        <Stack.Screen name="FoodScreen" component={FoodScreen} />
        <Stack.Screen name="PatientScreen" component={PatientScreen} />
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
