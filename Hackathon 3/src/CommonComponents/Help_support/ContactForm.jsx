import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import './ContactForm.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted sucessfully', { name, email, message });
  
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container className="contact-form mt-4">
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <TextField
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <TextField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <TextField
            multiline
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary" >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactForm;
