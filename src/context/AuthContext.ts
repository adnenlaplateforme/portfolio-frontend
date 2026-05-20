import { createContext } from 'react';

export type Role = 'admin' | 'editor';

export interface AuthContextValue {
  isAuthenticated: boolean;
  role: Role | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
