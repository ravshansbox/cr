import { FC } from 'react';
import { NavLink as NavLinkCore, NavLinkProps } from 'react-router';

export const NavLink: FC<NavLinkProps> = ({ children, ...props }) => {
  return (
    <NavLinkCore
      {...props}
      className={({ isActive }) => {
        return `block rounded border border-transparent px-2 py-1 text-blue-500 transition hover:text-blue-700 ${isActive ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-blue-50'}`;
      }}
    >
      {children}
    </NavLinkCore>
  );
};
