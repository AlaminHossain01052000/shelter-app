// AddResourceScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Picker, StyleSheet } from 'react-native';

const AddResources = () => {
  const [selectedType, setSelectedType] = useState('Water');
  const [amount, setAmount] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodAmount, setFoodAmount] = useState('');
  const [medicalType, setMedicalType] = useState('');
  const [medicalName, setMedicalName] = useState('');
  const [medicalQuantity, setMedicalQuantity] = useState('');

  const handleAmountChange = (value) => setAmount(value);
  const handleFoodNameChange = (value) => setFoodName(value);
  const handleFoodAmountChange = (value) => setFoodAmount(value);
  const handleMedicalTypeChange = (value) => setMedicalType(value);
  const handleMedicalNameChange = (value) => setMedicalName(value);
  const handleMedicalQuantityChange = (value) => setMedicalQuantity(value);
const handleSubmit=async()=>{
  switch(selectedType){
    case 'Water':
      try{
        await fetch('http://localhost:5000/water', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount:parseInt(amount)}),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          
          setAmount('');
        })
        .catch(error => {
          console.error('Error during POST request:', error.message);
          // Handle errors here
        });
       }
        catch(error){console.log(error)}
      break;
    case 'Food':
      try{
        await fetch('http://localhost:5000/food', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({foodName,foodAmount:parseInt(foodAmount)}),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          
          setFoodAmount('');
          setFoodName('')
        })
        .catch(error => {
          console.error('Error during POST request:', error.message);
          // Handle errors here
        });
       }
        catch(error){console.log(error)}
        break;
    case 'Medical':
      try{
        await fetch('http://localhost:5000/medical', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({medicalName,medicalType,medicalQuantity:parseInt(medicalQuantity)}),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          
          setMedicalName('')
          setMedicalQuantity('')
          setMedicalType('')
        })
        .catch(error => {
          console.error('Error during POST request:', error.message);
          // Handle errors here
        });
       }
        catch(error){console.log(error)}
      break;
      default:
        
        return null;


  }
}
  const renderForm = () => {
    switch (selectedType) {
      case 'Water':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Water Form</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount in Gallons"
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
            />
            <Button title='submit' onPress={handleSubmit}></Button>
          </View>
        );
      case 'Food':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Food Form</Text>
            <TextInput
              style={styles.input}
              placeholder="Food Name"
              value={foodName}
              onChangeText={handleFoodNameChange}
              
            />
            <TextInput
              style={styles.input}
              placeholder="Food Amount"
              value={foodAmount}
              onChangeText={handleFoodAmountChange}
              keyboardType="numeric"
            />
            <Button title='submit' onPress={handleSubmit}></Button>
          </View>
        );
      case 'Medical':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Medical Form</Text>
            <Picker
              style={styles.input}
              selectedValue={medicalType}
              onValueChange={handleMedicalTypeChange}
            >
              <Picker.Item label="Select Medical Type" value="" />
              <Picker.Item label="Medicine" value="Medicine" />
              <Picker.Item label="Hygiene" value="Hygiene" />
              {/* Add more medical type options as needed */}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Medical Name"
              value={medicalName}
              onChangeText={handleMedicalNameChange}
            />
            <TextInput
              style={styles.input}
              placeholder="Medical Quantity"
              value={medicalQuantity}
              onChangeText={handleMedicalQuantityChange}
              keyboardType="numeric"
            />
            <Button title='submit' onPress={handleSubmit}></Button>
          </View>
        );
      default:
        
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Water" onPress={() => setSelectedType('Water')} color="#2ecc71" />
        <Button style={styles.button} title="Food" onPress={() => setSelectedType('Food')} color="#e74c3c" />
        <Button style={styles.button} title="Medical" onPress={() => setSelectedType('Medical')} color="#f39c12" />
      </View>

      {renderForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
    
  },
  
  formContainer: {
    width: '100%',
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AddResources;
