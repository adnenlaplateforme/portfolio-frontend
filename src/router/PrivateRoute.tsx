import type { ReactNode } from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth?.isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
