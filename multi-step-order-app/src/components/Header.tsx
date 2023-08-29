import React, { useState } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import AuthModal from './AuthModal'; // Import your AuthModal component here
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface HeaderProps {
  username: string | null;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (username: string, email: string, password: string) => void;
}

function Header({ username, onLogout, onLogin, onRegister }: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/proxy/8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('/proxy/8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const handleAuthModalShow = () => {
    setShowAuthModal(true);
  };

  return (
    <header className="bg-light p-3">
      <nav className="container navbar navbar-light">
        <a className="navbar-brand" href="/">
          Telecom App
        </a>
        <Nav className="ml-auto">
          {username ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button variant="primary" onClick={handleAuthModalShow}>
              Login / Register
            </Button>
          )}
        </Nav>
      </nav>
      <AuthModal show={showAuthModal} onHide={handleAuthModalClose}>
        <LoginForm onLogin={handleLogin} onClose={handleAuthModalClose} />
        <RegisterForm onRegister={handleRegister} onClose={handleAuthModalClose} />
      </AuthModal>
    </header>
  );
}

export default Header;
