// DiseaseForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddDesease = () => {
  const [occupantName, setOccupantName] = useState('John Doe');
  const [occupantNo, setOccupantNo] = useState('123');
  const [age, setAge] = useState('30');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [weight, setWeight] = useState('70');
  const [bp, setBP] = useState('120/80');
  const [diseaseDetails, setDiseaseDetails] = useState('Fever, Cough');

  const onSubmit = () => {
    // Implement your logic for form submission here
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

      <Text style={styles.label}>Occupant No:</Text>
      <TextInput
        style={styles.input}
        value={occupantNo}
        onChangeText={(text) => setOccupantNo(text)}
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
