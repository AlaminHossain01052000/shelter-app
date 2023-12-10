import React, { useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, StyleSheet } from 'react-native';

const AddUser = () => {
  const [form, setForm] = useState({
    occupantNo: '',
    name: '',
    fatherName: '',
    motherName: '',
    presentAddress: '',
    permanentAddress: '',
    age: '',
    gender: '',
    bloodGroup: '',
    willingToDonate: '',
    DOB: '',
    email: '',
    contactNo1: '',
    contactNo2: '',
    campNo: '',
    assignedVolunteer: '',
    weight: '',
    height: '',
    healthIssues: '',
    numberOfFamilyMember: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    // Handle form submission, you can send data to the server or perform other actions here
    console.log('Form Data:', form);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Occupant Information</Text>

      {/* Input fields */}
      {Object.keys(form).map((field) => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{field}</Text>
          <TextInput
            style={styles.input}
            value={form[field]}
            onChangeText={(value) => handleInputChange(field, value)}
          />
        </View>
      ))}

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#27ae60',
    borderRadius: 10,
    padding: 15,
  },
});

export default AddUser;
