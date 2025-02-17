import { FC, use } from 'react';
import { AuthContext } from '../AuthContext';
import { Button, NavLink } from './core';
import { api } from '../api';
import { useNavigate } from 'react-router';

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const authContext = use(AuthContext);

  return (
    <header className="flex justify-between">
      <nav>
        <ul className="flex">
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <span>User: {authContext.value?.user_id}</span>
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
