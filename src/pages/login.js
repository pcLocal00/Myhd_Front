import { useState, useContext } from 'react';
import axios from 'axios';
import LoginForm from '../components/forms/LoginForm';
import AuthContext from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const [error, setError] = useState('');
  
  const Url = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (loginUser, passwordUser) => {
    try {
      const response = await axios.post(`${Url}/login`, {
        loginUser,
        passwordUser
      });

      const { data } = response;

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.rankUser);
      
      data.user.rankUser == 3 ? router.push('/admin/dashboard') : router.push('/');
      
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
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
