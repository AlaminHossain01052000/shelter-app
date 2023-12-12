// // ChatScreen.js
// import React, { useState, useEffect } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Listen for chat messages
//     socket.on('chat message', (message) => {
//       setMessages((prevMessages) => GiftedChat.append(prevMessages, message));
//     });

//     // Listen for updated list of users
//     socket.on('update users', (userList) => {
//       setUsers(userList);
//     });

//     return () => {
//       // Clean up event listeners on component unmount
//       socket.off('chat message');
//       socket.off('update users');
//     };
//   }, []);

//   const onSend = (newMessages = []) => {
//     // Emit the new message to the server
//     socket.emit('chat message', newMessages[0].text);
//   };

//   return (
//     <>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{ _id: socket.id }} // Using socket.id as a unique identifier for the user
//       />
//       <UserList users={users} />
//     </>
//   );
// };

// const UserList = ({ users }) => (
//   <div>
//     <h3>Users Online:</h3>
//     <ul>
//       {users.map((user) => (
//         <li key={user}>{user}</li>
//       ))}
//     </ul>
//   </div>
// );

// export default ChatScreen;
const ChatScreen=()=>{
  return(
    <View><Text>Hello</Text></View>
  )
}
export default ChatScreen;