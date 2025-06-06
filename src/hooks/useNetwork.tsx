
import { useState, useEffect } from 'react';

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkSpeed, setNetworkSpeed] = useState<string>('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check network speed if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setNetworkSpeed(connection.effectiveType || 'unknown');
      
      connection.addEventListener('change', () => {
        setNetworkSpeed(connection.effectiveType || 'unknown');
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, networkSpeed };
};
