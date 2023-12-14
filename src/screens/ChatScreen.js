import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import IconButton from '../utils/IconButton';
const ChatScreen = ({ loggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user,setUser]=useState({});

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/messages');
      const data = await response.json();
      // Sort messages by timestamp, latest at the bottom
      const sortedMessages = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${loggedIn}`);
      const data = await response.json();
      setUser(data)
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = async () => {
    // Send the new message to the server
    try {
      const response = await fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: loggedIn,
          message: newMessage,
          timestamp: new Date().toISOString(),
          user
        }),
      });

      if (response.status === 201) {
        // Message sent successfully, fetch updated messages
        fetchMessages();
        // Clear the input field
        setNewMessage('');
      } else {
        console.error('Failed to send message:', response.data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    fetchUser();
  }, [loggedIn]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.userId === loggedIn ? 'flex-end' : 'flex-start' }}>
            <Text
              style={{
                padding: 8,
                margin: 4,
                backgroundColor: item.userId === loggedIn ? 'lightblue' : 'lightgray',
                borderRadius: 8,
              }}>
              {item.message}
            </Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 8, marginRight: 8 }}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

export default ChatScreen;
