import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
const myTasks=[
    { id: '1', title: 'Feed the animals', status: 'Pending' },
    { id: '2', title: 'Clean the kennels', status: 'Pending' },
    { id: '3', title: 'Walk the dogs', status: 'Done' },
  ]
const ShelterTasks = () => {
  const [tasks, setTasks] = useState([]);
const [selectedTaskFilter,setSelectedTaskFilter]=useState('All')
const [newStatus, setNewStatus] = useState('Pending');
const volunteer_id=1004
const updateTaskStatus = async () => {
  try {
    const response = await fetch(`http://localhost:5000/tasks/${volunteer_id}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (response.ok) {
      console.log('Task status updated successfully');
      // Perform any additional actions after updating the status
    } else {
      console.error('Failed to update task status');
    }
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};
const handleTaskStatus=(id)=>{
    console.log(tasks)
    setTasks(myTasks.filter(task=>task.id===id?task.status==='Pending'?task.status='Done':task.status='Pending':task))
    console.log(tasks)
}
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
        onPress={() => handleTaskStatus(item.id)}
      >
        <Text style={styles.taskStatusText}>Pending</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
      style={[styles.taskStatusButton, { backgroundColor: '#2ecc71' }]}
      onPress={() => handleTaskStatus(item.id)}
    >
      <Text style={styles.taskStatusText}>Done</Text>
    </TouchableOpacity>
      }
    </View>

  );

  useEffect(()=>{
    
    switch (selectedTaskFilter) {
        case 'All':
            setTasks(myTasks)
            break;
        case 'Pending':
            setTasks(myTasks.filter(task=>task.status==='Pending'))
            break;
        case 'Done':
            setTasks(myTasks.filter(task=>task.status==='Done'))
            break;
    
        default:
            break;
    }
  },[selectedTaskFilter,tasks])

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
        keyExtractor={(item) => item.id}
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
