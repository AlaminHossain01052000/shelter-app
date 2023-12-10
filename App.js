import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Details from './src/screens/Details';
import AddUser from './src/screens/AddUser';
import UserRatio from './src/screens/UserRatio';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="UserRatio" component={UserRatio} />
    
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
