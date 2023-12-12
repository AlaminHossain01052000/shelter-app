import React, { useEffect, useState } from 'react';

const AddTask = () => {
    const [volunteers,setVolunteers]=useState([]);
  const [form, setForm] = useState({
    taskDetails: '',
    assignedVolunteer: '',
  });

//   const volunteers = [
//     { _id: '1', name: 'Volunteer 1' },
//     { _id: '2', name: 'Volunteer 2' },
//     { _id: '3', name: 'Volunteer 3' },
//     // Add more volunteers as needed
//   ];
useEffect(()=>{
    fetch('http://localhost:5000/users/volunteers')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setVolunteers(data)
    })
},[volunteers])

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async() => {
    const selectedVolunteer = volunteers.find(
      (volunteer) => volunteer.name === form.assignedVolunteer
    );

    if (selectedVolunteer) {
      const currentDate = new Date();
      const formattedDate = currentDate.toDateString();
      const formattedTime = currentDate.toLocaleTimeString();

      const taskData = {
        taskDetails: form.taskDetails,
        volunteerName: selectedVolunteer.name,
        volunteerId: selectedVolunteer.volunteerId,
        status: 'Pending',
        date: formattedDate,
        time: formattedTime,
      };

      try{
        await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // console.log('POST request successful:', data);
          // Handle the response data here
     
          setForm({
            taskDetails: '',
            assignedVolunteer: '',
          })
        })
        .catch(error => {
          console.error('Error during POST request:', error.message);
          // Handle errors here
        });
       }
        catch(error){console.log(error)}
    } else {
      console.error('Selected volunteer not found!');
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        Task Details:
        <input
          style={styles.input}
          type="text"
          value={form.taskDetails}
          onChange={(e) => handleInputChange('taskDetails', e.target.value)}
        />
      </label>
      <br />

      <label style={styles.label}>
        Assigned Volunteers:
        <select
          style={styles.select}
          value={form.assignedVolunteer}
          onChange={(e) => handleInputChange('assignedVolunteer', e.target.value)}
        >
          <option value="">Select Volunteer</option>
          {volunteers.map((volunteer) => (
            <option key={volunteer._id} value={volunteer.name}>
              {volunteer.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AddTask;
