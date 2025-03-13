import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './AuthContext';
import { Home, Login, MyCompanies, Register } from './pages';
import { DashboardLayout } from './components';

const queryClient = new QueryClient();

const entryRoutes = [
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
];

const dashboardRoutes = [
  { path: '/', Component: Home },
  { path: '/my-companies', Component: MyCompanies },
];

export const App: FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {entryRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                Component={route.Component}
              />
            ))}
            {dashboardRoutes.map((route) => (
              <Route key={route.path} path="/" Component={DashboardLayout}>
                <Route path={route.path} Component={route.Component} />
              </Route>
            ))}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
};
