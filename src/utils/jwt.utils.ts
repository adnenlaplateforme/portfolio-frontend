import { jwtDecode, type JwtPayload } from 'jwt-decode';
 
export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) return false;
    return decodedToken.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}