import { FC } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '.';

export const DashboardLayout: FC = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};
