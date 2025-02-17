import { FC, use } from 'react';
import { AuthContext } from '../AuthContext';
import { NavLink } from './core';

export const Navbar: FC = () => {
  const authContext = use(AuthContext);

  return (
    <header className="flex justify-between">
      <nav>
        <ul className="flex gap-2">
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
      <div>User: {authContext.value?.user_id}</div>
    </header>
  );
};
