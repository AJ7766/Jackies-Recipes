"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProfileProps } from '../types/types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileProps | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<ProfileProps | null>(null);

  const memoizedVerifyTokenAndFetchUser = useCallback(verifyTokenAndFetchUser, []);
  const memoizedFetchUserData = useCallback(fetchUserData, []);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    memoizedVerifyTokenAndFetchUser(token);
    }
  },[memoizedVerifyTokenAndFetchUser] );

  async function verifyTokenAndFetchUser(token: string) {
    if(token){
    try {
      const res = await fetch('/api/verify-token', {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            }
      });
      if (!res.ok) {
        throw new Error(`Failed to verify token: ${res.status} - ${res.statusText}`);
      }
      if (res.ok) {
        const result = await res.json();
        if (result.valid) {
          setIsAuthenticated(true);
          fetchUserData(token);
        } else {
          localStorage.removeItem('token');
        }
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Token verification failed', error);
      localStorage.removeItem('token');
    }
    }
  };

  async function fetchUserData(token: string) {
    if(token){
    try {
      const res = await fetch('/api/user-profile', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
      }
        const data = await res.json();
        console.log(data);
        setUser(data);
    } catch (error) {
      console.error('Error fetching user data', error);
      setUser(null);
    }
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    verifyTokenAndFetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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