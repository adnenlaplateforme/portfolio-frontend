import type { ReactNode } from 'react';
import { useState } from 'react';
import AuthContext from './AuthContext';
import { isTokenValid, getRoleFromToken } from '../utils/jwt.utils';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem('token');
    if (!isTokenValid(stored)) {
      localStorage.removeItem('token');
      return null;
    }
    return stored;
  });

  function login(newToken: string) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: token !== null,
      role: getRoleFromToken(token),
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
