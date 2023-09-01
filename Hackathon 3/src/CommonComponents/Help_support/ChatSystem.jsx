import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './ChatSystem.css';

const ChatSystem = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { text: newMessage, user: 'user' }]);
    setNewMessage('');

    setTimeout(handleSupportReply, 500); // Simulate support response after a delay
  };

  const handleSupportReply = () => {
    const userMessage = newMessage.toLowerCase();
    let supportResponse = "I'm sorry, I couldn't understand your query.";

    if (userMessage.includes('activate')) {
      supportResponse = 'To activate your service, please visit our website or call our helpline.';
    } else if (userMessage.includes('balance')) {
      supportResponse = 'You can check your balance by dialing *123# on your phone.';
    } else if (userMessage.includes('plans') || userMessage.includes('data')) {
      supportResponse = 'We offer various data plans to suit your needs. You can find details on our website.';
    }
    else if (userMessage.includes('hi') || userMessage.includes('hello')) {
      supportResponse = 'Hello! How can I assist you today?';
    }
    else if (userMessage.includes('sim') || userMessage.includes('working')) {
        supportResponse = 'If your sim is not working do try to remove and insert again';
    } 
     else if (userMessage.includes('network') || userMessage.includes('not working')) {
      supportResponse = 'You can try restarting your phone or contacting customer care.';
    }
    

    setMessages([...messages, { text: newMessage, user: 'user' }, { text: supportResponse, user: 'support' }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="telecom-chat">
        <h3>Help/Support</h3>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <TextField
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <Button onClick={handleSendMessage} variant="contained" color="success">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatSystem;
