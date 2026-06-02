import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { api, setToken, clearToken } from '../api/client';

interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
  venueId: string | null;
  venueName: string | null;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const savedToken = localStorage.getItem('token');
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [venueId, setVenueId] = useState<string | null>(localStorage.getItem('venueId'));
  const [venueName, setVenueName] = useState<string | null>(localStorage.getItem('venueName'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

  const login = useCallback(async (user: string, pass: string) => {
    const res = await api.login(user, pass);
    setToken(res.token);
    setRole(res.role);
    setVenueId(res.venueId);
    setVenueName(res.venueName);
    setUsername(user);
    localStorage.setItem('role', res.role);
    localStorage.setItem('venueId', res.venueId || '');
    localStorage.setItem('venueName', res.venueName || '');
    localStorage.setItem('username', user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setRole(null);
    setVenueId(null);
    setVenueName(null);
    setUsername(null);
    localStorage.removeItem('role');
    localStorage.removeItem('venueId');
    localStorage.removeItem('venueName');
    localStorage.removeItem('username');
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!savedToken && !!role,
      role, venueId, venueName, username, login, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
