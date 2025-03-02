import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './AuthContext';
import { Home, Login, MyCompanies, Register } from './pages';
import { DashboardLayout } from './components';

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
    </AuthProvider>
  );
};
