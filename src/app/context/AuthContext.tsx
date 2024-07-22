"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProfileProps } from '../types/types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileProps | null;
  login: (token: string) => void;
  logout: () => void;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<ProfileProps | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  const fetchUserData = useCallback(async (token: string) => {
    console.log("AuthPage running")
    if(token){
        console.log("AuthPage running")
        try {
            const res = await fetch("/api/user-profile", {
                method: "POST",
                body: JSON.stringify({ token }),
                headers: {
                  "Content-Type": "application/json"
              },
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
}, []);

  const verifyTokenAndFetchUser = useCallback(async (token: string) => {
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
        const result = await res.json();
        if (result.valid) {
            console.log(result.message);
          setIsAuthenticated(true);
          await fetchUserData(token);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token verification failed', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
    console.log("initializing false")
    setInitializing(false); 
  }, [fetchUserData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    verifyTokenAndFetchUser(token);
    }else{
        console.log("initializing false")
        setInitializing(false); 
    }
  },[verifyTokenAndFetchUser] );

  const login = (token: string) => {
    localStorage.setItem('token', token);
    verifyTokenAndFetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, initializing }}>
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