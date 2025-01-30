import { FC, use, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';
import { api } from './api';

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
      const token = await api.getToken({ params: { id: tokenId } });
      authContext.setValue(token);
    })().catch(console.error);
  }, []);

  return <h1>User id: {authContext.value?.user_id}</h1>;
};
