import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Dashboard } from './Dashboard';
import { Login } from './Login';
import { NavLink } from './components/NavLink';
import { AuthProvider } from './AuthContext';

export const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
