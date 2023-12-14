import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ShelterTasks = ({loggedIn}) => {
  const [tasks, setTasks] = useState([]);
const [selectedTaskFilter,setSelectedTaskFilter]=useState('All')
const [newStatus, setNewStatus] = useState('Pending');
const [volunteerId,setVolunteerId]=useState(loggedIn);
    useEffect(()=>{
    setVolunteerId(loggedIn);
    },[volunteerId,loggedIn])

const fetchTasks=async()=>{
  const tailParam=selectedTaskFilter==='All'?`${volunteerId}`:`${selectedTaskFilter}/${volunteerId}`
    console.log(`http://localhost:5000/tasks/${tailParam}`)
    try{
      
        await fetch(`http://localhost:5000/tasks/${tailParam}`)
     .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data=>{
        setTasks(data)
    
    })
      
      
    }
    catch(error){
      console.log(error)
    }
}
    
const updateTaskStatus = async (taskId,taskStatus) => {
 
  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: taskStatus,
      }),
    });

    if (response.ok) {
      console.log('Task status updated successfully');
      fetchTasks();
      // Perform any additional actions after updating the status
    } else {
      console.error('Failed to update task status');
    }
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};

  const renderBlurEffect = (status) => {
    
    return status === 'Done' ? { opacity: 0.5 } : null;
  };

  const renderListItem = ({ item }) => (

    <View style={[styles.taskItem,renderBlurEffect(item.status)]}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      {/* <Text style={styles.taskTitle}>{item.status}</Text> */}
      {
        item.status==='Pending'?
        <TouchableOpacity
        style={[styles.taskStatusButton, { backgroundColor: '#3498db' }]}
        onPress={() => updateTaskStatus(item._id,"Done")}
      >
        <Text style={styles.taskStatusText}>Pending</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
      style={[styles.taskStatusButton, { backgroundColor: '#2ecc71' }]}
      onPress={() => updateTaskStatus(item._id,"Pending")}
    >
      <Text style={styles.taskStatusText}>Done</Text>
    </TouchableOpacity>
      }
    </View>

  );

  useEffect(()=>{
    fetchTasks();
  },[selectedTaskFilter,volunteerId])

  return (
    <View style={styles.container}>
      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedTaskFilter('Pending')}
        >
          <Text style={styles.filterButtonText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedTaskFilter('Done')}
        >
          <Text style={styles.filterButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedTaskFilter('All')}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
      </View>
      
       
        <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={renderListItem}
        style={styles.taskList}
      />
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  taskStatusButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  taskStatusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ShelterTasks;
