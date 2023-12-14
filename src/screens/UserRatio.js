// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Text, View, Button, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const UserRatio = () => {
  const [filterType, setFilterType] = useState('gender');
  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/occupants');
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle filter change
  const handleFilterChange = () => {
    if (filterType === 'gender') {
      setFilterType('ageGroup');
    } else {
      setFilterType('gender');
    }
  };

  // Calculate percentages based on filter type
  const calculatePercentages = () => {
    if (filterType === 'gender') {
      const maleCount = users.filter((user) => user.gender === 'male').length;
      const femaleCount = users.filter((user) => user.gender === 'female').length;

      const malePercentage = (maleCount / users.length) * 100;
      const femalePercentage = (femaleCount / users.length) * 100;

      setFilteredData([
        { name: 'Male', population: malePercentage, color: '#3498db' },
        { name: 'Female', population: femalePercentage, color: '#e74c3c' },
      ]);
    } else if (filterType === 'ageGroup') {
      const ageGroups = {
        '1-5': 0,
        '6-10': 0,
        '11-18': 0,
        '18+': 0,
      };

      users.forEach((user) => {
        if (user.age >= 1 && user.age <= 5) {
          ageGroups['1-5']++;
        } else if (user.age >= 6 && user.age <= 10) {
          ageGroups['6-10']++;
        } else if (user.age >= 11 && user.age <= 18) {
          ageGroups['11-18']++;
        } else {
          ageGroups['18+']++;
        }
      });

      const formattedData = [];
      const pieColors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12'];
      formattedData.push({ name: '(1-5)', population: ageGroups['1-5'], color: pieColors[0] });
      formattedData.push({ name: '(6-10)', population: ageGroups['6-10'], color: pieColors[1] });
      formattedData.push({ name: '(11-18)', population: ageGroups['11-18'], color: pieColors[2] });
      formattedData.push({ name: '(18+)', population: ageGroups['18+'], color: pieColors[3] });

      setFilteredData(formattedData);
    }
  };

  useEffect(() => {
    calculatePercentages();
  }, [filterType, users]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>User Data Filter</Text>
      <Button title={filterType === 'gender' ? 'Filter by Age Group' : 'Filter by Gender'} onPress={handleFilterChange} />

      <PieChart
        data={filteredData}
        width={Dimensions.get('window').width}
        height={200}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        center={[10, 15]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserRatio;
