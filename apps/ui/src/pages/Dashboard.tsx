import { FC, use, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext';
import { api } from '../api';

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const authContext = use(AuthContext);

  useEffect(() => {
    (async () => {
      const tokenId = localStorage.getItem('token');
      if (tokenId === null) {
        await navigate('/login');
        return;
      }
      try {
        const token = await api.getToken({ params: { id: tokenId } });
        authContext.setValue(token);
      } catch {
        localStorage.removeItem('token');
        await navigate('/login');
      }
    })().catch(console.error);
  }, []);

  return <h1>Dashboard</h1>;
};
