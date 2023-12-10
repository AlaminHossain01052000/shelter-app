import React, { useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, StyleSheet } from 'react-native';

const Form = () => {
  const [form, setForm] = useState({
    occupentNo: '',
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
      <Button title="Submit" onPress={handleSubmit} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default Form;
