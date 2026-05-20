import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { Role } from '../context/AuthContext';

interface AppJwtPayload extends JwtPayload {
  role?: Role;
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = jwtDecode<AppJwtPayload>(token);
    if (!decoded.exp) return false;
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function getRoleFromToken(token: string | null): Role | null {
  if (!token) return null;
  try {
    const decoded = jwtDecode<AppJwtPayload>(token);
    return decoded.role ?? null;
  } catch {
    return null;
  }
}
