// src/pages/protected.js
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/contexts/AuthContext';

const ProtectedPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return <div>This is a protected page</div>;
};

export default ProtectedPage;
