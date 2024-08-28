// src/pages/login.js
import { useState, useContext } from 'react';
import LoginForm from '../components/forms/LoginForm';
import AuthContext from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext); // Access logout function from context
  const [error, setError] = useState('');
  
  const Url = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (loginUser, passwordUser) => {
    try {
      const response = await fetch(`${Url}/login`, {
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
