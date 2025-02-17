import { classed } from '@tw-classed/react';
import { NavLink as NavLinkCore } from 'react-router';

export const NavLink = classed(NavLinkCore, {
  base: 'block rounded border border-transparent px-2 py-1 text-blue-500 transition hover:bg-blue-50 hover:text-blue-700',
});
