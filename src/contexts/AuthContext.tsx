import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_CREDENTIALS } from '../constants/auth';

// Define user types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'policyholder' | 'insurer';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Demo login logic
    let demoUser: User | null = null;

    if (email === DEMO_CREDENTIALS.INSURER.email && password === DEMO_CREDENTIALS.INSURER.password) {
      demoUser = {
        id: 'INS-001',
        name: DEMO_CREDENTIALS.INSURER.name,
        email: DEMO_CREDENTIALS.INSURER.email,
        role: 'insurer'
      };
    } else if (email === DEMO_CREDENTIALS.POLICYHOLDER.email && password === DEMO_CREDENTIALS.POLICYHOLDER.password) {
      demoUser = {
        id: 'POL-001',
        name: DEMO_CREDENTIALS.POLICYHOLDER.name,
        email: DEMO_CREDENTIALS.POLICYHOLDER.email,
        role: 'policyholder'
      };
    }

    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};