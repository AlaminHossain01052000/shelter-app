import React, { useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, StyleSheet, Picker } from 'react-native';
import Modal from 'react-native-modal';
const AddUser = () => {
  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    presentAddress: '',
    permanentAddress: '',
    nid: '',
    gender: 'male',
    bloodGroup: 'A+',
    willingToDonate: 'no',
    day: '', // Day of birth
    month: '', // Month of birth
    year: '', // Year of birth
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
  const [isModalVisible, setModalVisible] = useState(false);
  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
 

  const handleSubmit = async() => {
    
   try{
    await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...form,age:new Date().getFullYear()-(parseInt(form.year, 10) || 0),type:'Occupants'}),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // console.log('POST request successful:', data);
      // Handle the response data here
      toggleModal();
      setForm({
        name: '',
        fatherName: '',
        motherName: '',
        presentAddress: '',
        permanentAddress: '',
        nid: '',
        gender: 'male',
        bloodGroup: 'A+',
        willingToDonate: 'no',
        day: '', // Day of birth
        month: '', // Month of birth
        year: '', // Year of birth
        email: '',
        contactNo1: '',
        contactNo2: '',
        campNo: '',
        assignedVolunteer: '',
        weight: '',
        height: '',
        healthIssues: '',
        numberOfFamilyMember: '',
      })
    })
    .catch(error => {
      console.error('Error during POST request:', error.message);
      // Handle errors here
    });
   }
    catch(error){console.log(error)}
  };
  const modifiedFieldName=(fieldName)=>{
    let newFieldName="";
    newFieldName+=fieldName.toUpperCase()[0];
    for(let i=1;i<fieldName.length;++i){
      if(fieldName[i]>='A'&&fieldName[i]<='Z')newFieldName+=' ';
      newFieldName+=fieldName[i];
    }
    console.log(newFieldName)
    return newFieldName
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Occupant Information</Text>

      {/* Input fields */}
      {Object.keys(form).map((field) => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{modifiedFieldName(field)}</Text>
          {field === 'gender' && (
            <Picker
              selectedValue={form[field]}
              onValueChange={(value) => handleInputChange(field, value)}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Others" value="others" />
            </Picker>
          )}
          {field === 'willingToDonate' && (
            <Picker
              selectedValue={form[field]}
              onValueChange={(value) => handleInputChange(field, value)}
            >
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>
          )}
          {field === 'bloodGroup' && (
            <Picker
              selectedValue={form[field]}
              onValueChange={(value) => handleInputChange(field, value)}
            >
             
              
              <Picker. Item label="A+" value="A+" />
              <Picker. Item label="B+" value="B+" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              {/* Add more blood groups as needed */}
            </Picker>
          )}
          
          {/* {(field === 'day' || field === 'month' || field === 'year') && (
            <TextInput
              style={styles.input}
              
              value={form[field]}
              onChangeText={(value) => handleInputChange(field, value)}
              keyboardType="numeric"
            />
          )}  */}
          {(field!='gender'&&field!='bloodGroup'&&field!='willingToDonate')&& (
            <TextInput
              style={styles.input}
              value={form[field]}
              onChangeText={(value) => handleInputChange(field, value)}
              placeholder={field === 'weight' || field === 'height' ? `Enter ${field} (lb/cm)` : ""}
              keyboardType={field === 'weight' || field === 'height' || field === 'age' ? 'numeric' : 'default'}
            />
          )}
        </View>
      ))}

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />

      {/* modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Form Submitted Successfully!</Text>
          <Button title="OK" onPress={toggleModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
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
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#333',
    padding: 12,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#27ae60',
    borderRadius: 10,
    padding: 15,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AddUser;
