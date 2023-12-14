// DiseaseForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddDesease = () => {
  const [occupantName, setOccupantName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [weight, setWeight] = useState('');
  const [bp, setBP] = useState('');
  const [diseaseDetails, setDiseaseDetails] = useState('');

  const onSubmit = async() => {
    // Implement your logic for form submission here
    try{
      await fetch('http://localhost:5000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({occupantName,age,bloodGroup,weight,bp,diseaseDetails,status:'Pending'}),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        
        setBP('')
        setAge('')
        setBloodGroup('')
        setDiseaseDetails('')
        setOccupantName('')
        setWeight('')
        
      })
      .catch(error => {
        console.error('Error during POST request:', error.message);
        // Handle errors here
      });
     }
      catch(error){console.log(error)}
    console.log('Form submitted!');
    // You can send the form data to an API, update state, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Occupant Health Form</Text>

      <Text style={styles.label}>Occupant Name:</Text>
      <TextInput
        style={styles.input}
        value={occupantName}
        onChangeText={(text) => setOccupantName(text)}
      />

      

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Blood Group:</Text>
      <TextInput
        style={styles.input}
        value={bloodGroup}
        onChangeText={(text) => setBloodGroup(text)}
      />

      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>BP (Blood Pressure):</Text>
      <TextInput
        style={styles.input}
        value={bp}
        onChangeText={(text) => setBP(text)}
      />

      <Text style={styles.label}>Disease Details:</Text>
      <TextInput
        style={styles.input}
        value={diseaseDetails}
        onChangeText={(text) => setDiseaseDetails(text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddDesease;
