
import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineMessage) {
    return null;
  }

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      showOfflineMessage ? 'animate-slide-in-right' : 'animate-fade-out'
    }`}>
      <div className="glass-effect rounded-full px-4 py-2 text-white flex items-center space-x-2">
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4 text-green-400" />
            <span className="text-sm">Подключение восстановлено</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 text-red-400" />
            <span className="text-sm">Работа офлайн</span>
          </>
        )}
      </div>
    </div>
  );
};
