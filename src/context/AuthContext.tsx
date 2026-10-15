import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/index.js';
import { api } from '../services/api.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  loginWithCredentials: (identifier: string, pass: string) => Promise<{ success: boolean; user?: User; token?: string; isAdmin?: boolean; error?: string }>;
  loginWithGoogle: (data: { email: string; name: string; googleId?: string; avatar?: string }) => Promise<{ success: boolean; user?: User; token?: string; isAdmin?: boolean; error?: string }>;
  registerUser: (data: any) => Promise<{ success: boolean; user?: User; token?: string; error?: string }>;
  logout: () => void;
  switchRole: (role: User['role']) => void;
  demoAccounts: any[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('hg_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read user from storage', e);
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('hg_token') || null;
    } catch {
      return null;
    }
  });

  const [demoAccounts, setDemoAccounts] = useState<any[]>([]);

  useEffect(() => {
    api.getDemoAccounts().then(data => {
      if (data?.accounts) {
        setDemoAccounts(data.accounts);
      }
    }).catch(err => console.log('Could not load demo accounts:', err));
  }, []);

  const login = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    try {
      localStorage.setItem('hg_user', JSON.stringify(newUser));
      localStorage.setItem('hg_token', newToken);
    } catch (e) {
      console.warn('Storage error', e);
    }
  };

  const loginWithCredentials = async (identifier: string, pass: string) => {
    try {
      const res = await api.login(identifier, pass);
      if (res.user && res.token) {
        login(res.user, res.token);
        return {
          success: true,
          user: res.user,
          token: res.token,
          isAdmin: res.user.role === 'system_admin'
        };
      }
      return { success: false, error: res.error || 'Login failed. Please check credentials.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during login.' };
    }
  };

  const loginWithGoogle = async (data: { email: string; name: string; googleId?: string; avatar?: string }) => {
    try {
      const res = await api.loginWithGoogle(data);
      if (res.user && res.token) {
        login(res.user, res.token);
        return {
          success: true,
          user: res.user,
          token: res.token,
          isAdmin: res.user.role === 'system_admin'
        };
      }
      return { success: false, error: res.error || 'Google login failed.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during Google authentication.' };
    }
  };

  const registerUser = async (data: any) => {
    try {
      const res = await api.register(data);
      if (res.user && res.token) {
        login(res.user, res.token);
        return { success: true, user: res.user, token: res.token };
      }
      return { success: false, error: res.error || 'Registration failed.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during registration.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('hg_user');
      localStorage.removeItem('hg_token');
    } catch (e) {
      console.warn('Storage error', e);
    }
  };

  const switchRole = (role: User['role']) => {
    const match = demoAccounts.find(a => a.role === role);
    let updated: User;
    if (match) {
      updated = {
        id: match.id,
        name: match.name,
        phone: match.phone,
        email: match.email,
        role: match.role
      };
    } else {
      updated = {
        id: 'usr-temp',
        name: 'Staff Member',
        phone: '0700000000',
        email: 'staff@heavensgate.org',
        role
      };
    }
    setUser(updated);
    try {
      localStorage.setItem('hg_user', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage error', e);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      loginWithCredentials,
      loginWithGoogle,
      registerUser,
      logout,
      switchRole,
      demoAccounts
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
