import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const PatientScreen = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patient data from the API
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handlePendingButtonClick = async (patientId) => {
    try {
      // Send a DELETE request to delete the patient
      const response = await fetch(`http://localhost:5000/patients/${patientId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Patient deleted successfully, update the patient list
        fetchPatients();
      } else {
        console.error('Failed to delete patient:', response.data);
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Patient List</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text style={styles.patientName}>{item.occupantName}</Text>
            
            <Button
              title="Pending"
              onPress={() => handlePendingButtonClick(item._id)}
              color="#ff6961" // Light Salmon color
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f0f0f0', // Light Gray background color
    borderRadius: 8,
  },
  patientName: {
    fontSize: 18,
  },
  patientStatus: {
    fontSize: 16,
    color: '#888888', // Gray color
  },
});

export default PatientScreen;
