
import { useState, useEffect } from 'react';
import { GoogleAuth } from '@capacitor/google-auth';
import { Capacitor } from '@capacitor/core';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  accessToken: string;
}

export const useGoogleAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      GoogleAuth.initialize();
    }
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await GoogleAuth.signIn();
      
      const googleUser: GoogleUser = {
        id: result.id,
        email: result.email,
        name: result.name,
        imageUrl: result.imageUrl,
        accessToken: result.accessToken
      };
      
      setUser(googleUser);
      localStorage.setItem('googleUser', JSON.stringify(googleUser));
      
      return googleUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка авторизации';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await GoogleAuth.signOut();
      setUser(null);
      localStorage.removeItem('googleUser');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка выхода';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const savedUser = localStorage.getItem('googleUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Ошибка проверки статуса авторизации:', err);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    user,
    isLoading,
    error,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
};
