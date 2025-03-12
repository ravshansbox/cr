import { FC, use } from 'react';
import { useNavigate } from 'react-router';
import { hstack } from '@/styled-system/patterns';
import { api } from '../api';
import { AuthContext } from '../AuthContext';
import { Button, NavLink } from './core';

const links = [
  { path: '/', label: 'Home' },
  { path: '/my-companies', label: 'My Companies' },
];

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const authContext = use(AuthContext);

  return (
    <header className={hstack({ justify: 'space-between' })}>
      <nav>
        <ul className={hstack()}>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={hstack()}>
        <span>{authContext.value?.user.username}</span>
        <Button
          variant="link"
          onClick={async () => {
            const tokenId = authContext.value?.token;
            if (!tokenId) return;
            await api.deleteToken({ params: { id: tokenId } });
            localStorage.removeItem('token');
            authContext.setValue(null);
            await navigate('/login');
          }}
        >
          logout
        </Button>
      </div>
    </header>
  );
};
