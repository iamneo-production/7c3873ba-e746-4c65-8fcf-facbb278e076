import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import Footer from './components/Footer';

interface User {
  _id: string;
  username: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null') as User | null;
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('https://ide-cdccbbbcebbacdbfaeaaecfbcdbacecdeab.premiumproject.examly.io/proxy/8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, userId } = data;
        
        localStorage.setItem('token', token);

        const loggedInUser: User = { _id: userId, username: email };
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('https://ide-cdccbbbcebbacdbfaeaaecfbcdbacecdeab.premiumproject.examly.io/proxy/8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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

  const handleLogout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div>
      <Header
        username={user ? user.username : null}
        onLogout={handleLogout}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      <ContentArea />
      <Footer />
    </div>
  );
}

export default App;
