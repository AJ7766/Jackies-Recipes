"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProfileProps } from '../types/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileProps | null;
  updateProfile: (updatedProfile: ProfileProps) => void;
  login: (token: string) => void;
  logout: () => void;
  initializing: boolean;
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<ProfileProps | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);
  const router = useRouter();

  const fetchUserData = useCallback(async (token: string) => {
    const cachedProfile = sessionStorage.getItem('userProfile');
    if (cachedProfile) {
      setUser(JSON.parse(cachedProfile));
      setInitializing(false);
      return;
    }
    if(token){
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
        setUser(data.userData);
        sessionStorage.setItem('userProfile', JSON.stringify(data.userData));
        setInitializing(false);
      } catch (error) {
      console.error('Error fetching user data', error);
      localStorage.removeItem('token');
      sessionStorage.removeItem('userProfile');
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
            setIsAuthenticated(true);
            await fetchUserData(token);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token verification failed', error);
        localStorage.removeItem('token');
        sessionStorage.removeItem('userProfile');
        setIsAuthenticated(false);
      }
      finally{
        setInitializing(false); 
      }
    }
  }, [fetchUserData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    verifyTokenAndFetchUser(token);
    }else{
        setInitializing(false); 
    }
  },[verifyTokenAndFetchUser] );

  const login = (token: string) => {
    localStorage.setItem('token', token);
    verifyTokenAndFetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    setUser(null);
    router.push(`/`);
  };

  const updateProfile = (updatedProfile: ProfileProps) => {
    setUser(updatedProfile);
    sessionStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, updateProfile, login, logout, initializing }}>
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