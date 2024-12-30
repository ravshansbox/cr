import { classed } from '@tw-classed/react';
import { NavLink as NavLinkCore } from 'react-router';

export const NavLink = classed(NavLinkCore, {
  base: 'text-blue-500 hover:text-blue-700',
});
