/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';

const AdminRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
      const role = localStorage.getItem('role');
      if (role !== '3') {
        router.push('/user/index');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default AdminRoute;
