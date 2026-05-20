import type { ReactNode } from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import type { Role } from '../context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  role?: Role;
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const auth = useContext(AuthContext);
  if (!auth?.isAuthenticated) return <Navigate to="/login" />;
  if (role && auth.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
}
