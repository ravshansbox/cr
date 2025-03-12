import { FC } from 'react';
import { NavLink as NavLinkCore, NavLinkProps } from 'react-router';
import { css } from '@/styled-system/css';

export const NavLink: FC<NavLinkProps> = ({ children, ...props }) => {
  return (
    <NavLinkCore
      {...props}
      className={({ isActive }) => {
        return css({
          display: 'block',
          borderRadius: 'md',
          border: '1px solid',
          borderColor: 'transparent',
          px: '2',
          py: '1',
          color: 'blue.500',
          transition: 'all',
          ...(isActive
            ? { bg: 'blue.50', _hover: { bg: 'blue.100' } }
            : { _hover: { bg: 'blue.50' } }),
        });
      }}
    >
      {children}
    </NavLinkCore>
  );
};
