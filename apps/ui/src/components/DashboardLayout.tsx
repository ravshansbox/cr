import { FC, use, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { stack } from '@/styled-system/patterns';
import { api, httpClient } from '../api';
import { AuthContext } from '../AuthContext';
import { Navbar } from '.';

export const DashboardLayout: FC = () => {
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
        httpClient.setHeader('Authorization', `Bearer ${token.token}`);
        authContext.setValue(token);
      } catch {
        localStorage.removeItem('token');
        await navigate('/login');
      }
    })().catch(console.error);
  }, []);

  if (authContext.value === null) return null;

  return (
    <main className={stack({ gap: 2 })}>
      <Navbar />
      <Outlet />
    </main>
  );
};
