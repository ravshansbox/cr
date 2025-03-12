import { FC, PropsWithChildren } from 'react';
import { hstack, stack } from '@/styled-system/patterns';
import { NavLink } from './core';

const links = [
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'Register' },
];

export const EntryLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={stack({ mx: 'auto', w: 'md', mt: 16 })}>
      <nav>
        <ul className={hstack({ gap: 2 })}>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
};
