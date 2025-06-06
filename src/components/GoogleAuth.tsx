
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { LogIn, LogOut, User } from 'lucide-react';

export const GoogleAuth = () => {
  const { user, isLoading, error, signIn, signOut, isAuthenticated } = useGoogleAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3 glass-effect rounded-lg p-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{user.name}</p>
          <p className="text-xs text-white/70 truncate">{user.email}</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          disabled={isLoading}
          className="text-white hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-lg p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2">
          Подключите YouTube
        </h3>
        <p className="text-sm text-white/70">
          Войдите через Google, чтобы синхронизировать свои плейлисты
        </p>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}
      
      <Button
        onClick={signIn}
        disabled={isLoading}
        className="w-full bg-white text-black hover:bg-gray-100"
      >
        <LogIn className="h-4 w-4 mr-2" />
        {isLoading ? 'Вход...' : 'Войти через Google'}
      </Button>
    </div>
  );
};
