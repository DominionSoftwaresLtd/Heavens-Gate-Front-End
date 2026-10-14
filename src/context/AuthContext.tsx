import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/index.js';
import { api } from '../services/api.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  switchRole: (role: User['role']) => void;
  demoAccounts: any[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to registered pilgrim for easy testing
  const [user, setUser] = useState<User | null>({
    id: 'usr-pilgrim-1',
    name: 'John Kamau Karanja',
    phone: '0722123456',
    email: 'kamau@example.com',
    role: 'registered_pilgrim',
    nationalId: '29876543',
    isFirstTime: false,
    totalVisits: 3
  });
  const [token, setToken] = useState<string | null>('mock-jwt-token');
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
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const switchRole = (role: User['role']) => {
    const match = demoAccounts.find(a => a.role === role);
    if (match) {
      setUser({
        id: match.id,
        name: match.name,
        phone: match.phone,
        email: match.email,
        role: match.role
      });
    } else {
      setUser(prev => prev ? { ...prev, role } : {
        id: 'usr-temp',
        name: 'Staff Member',
        phone: '0700000000',
        email: 'staff@heavensgate.or.ke',
        role
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, demoAccounts }}>
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
