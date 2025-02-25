import { FC, PropsWithChildren } from 'react';
import { NavLink } from './core';

const links = [
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'Register' },
];

export const EntryLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto mt-8 max-w-md">
      <nav>
        <ul className="flex gap-2">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <h1 className="text-3xl">Entry</h1>
      {children}
    </div>
  );
};
