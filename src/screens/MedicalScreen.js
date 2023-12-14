// MedicalScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MedicalScreen = () => {
    const [medicalData,setMedicalData]=useState([]);
  // Sum up quantities for each unique medical name
  useEffect(()=>{
    try{
         fetch('http://localhost:5000/medical').then(res=>res.json()).then(data=>{
            const aggregatedData = data.reduce((acc, item) => {
                const medicalName = item.medicalName.toLowerCase(); // Convert to lowercase for case-insensitive comparison
                if (acc[medicalName]) {
                  acc[medicalName] += item.medicalQuantity;
                } else {
                  acc[medicalName] = item.medicalQuantity;
                }
                return acc;
              }, {});
              const formattedData = Object.keys(aggregatedData).map((medicalName) => ({
                medicalName,
                medicalQuantity: aggregatedData[medicalName],
              }));
            setMedicalData(formattedData)
         })
    }
    catch(error){
        console.log(error)
    }
  },[])
  

  

  // Render each item in a FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.medicalName}>{item.medicalName}</Text>
      <Text style={styles.medicalQuantity}>{item.medicalQuantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={medicalData}
        keyExtractor={(item) => item.medicalName}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  medicalName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize', // Capitalize the first letter of each word
  },
  medicalQuantity: {
    fontSize: 16,
  },
});

export default MedicalScreen;
