
import { useState, useEffect } from 'react';

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

  // Проверяем, загружен ли Google API
  const isGoogleAPILoaded = () => {
    return typeof window !== 'undefined' && window.google && window.google.accounts;
  };

  const signIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!isGoogleAPILoaded()) {
        throw new Error('Google API не загружен');
      }

      // Инициализируем Google Sign-In
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        scope: 'profile email https://www.googleapis.com/auth/youtube.readonly',
        callback: (response: any) => {
          if (response.access_token) {
            // Получаем информацию о пользователе
            fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`)
              .then(res => res.json())
              .then(userInfo => {
                const googleUser: GoogleUser = {
                  id: userInfo.id,
                  email: userInfo.email,
                  name: userInfo.name,
                  imageUrl: userInfo.picture,
                  accessToken: response.access_token
                };
                
                setUser(googleUser);
                localStorage.setItem('googleUser', JSON.stringify(googleUser));
              })
              .catch(err => {
                setError('Ошибка получения данных пользователя');
                console.error(err);
              });
          }
        },
      });

      client.requestAccessToken();
      
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
      if (user?.accessToken && isGoogleAPILoaded()) {
        window.google.accounts.oauth2.revoke(user.accessToken);
      }
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
