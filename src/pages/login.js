// src/pages/login.js
import { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (loginUser, passwordUser) => {
    try {
      // Call your authentication API here
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUser, passwordUser }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Handle successful login
      // For example, save the token and redirect
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
