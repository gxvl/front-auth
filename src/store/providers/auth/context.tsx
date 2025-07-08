"use client";

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { AuthState, AuthContextType } from './types'; // Importa os tipos definidos

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children, 
}: {
  children: ReactNode;
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt_token');
      const userName = localStorage.getItem('user_name');
      const userEmail = localStorage.getItem('user_email');

      if (token && userName && userEmail) {
        setAuthState({
          isAuthenticated: true,
          user: { name: userName, email: userEmail },
          token: token,
        });
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userName: string, userEmail: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user_name', userName);
      localStorage.setItem('user_email', userEmail);
    }
    setAuthState({
      isAuthenticated: true,
      user: { name: userName, email: userEmail },
      token: token,
    });
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
    }
    setAuthState({ isAuthenticated: false, user: null, token: null });
  };

  const contextValue = {
    ...authState,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};