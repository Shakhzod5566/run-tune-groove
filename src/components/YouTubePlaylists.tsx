
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { YouTubeService } from '@/services/youtubeService';
import { Play, Music } from 'lucide-react';

interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
}

export const YouTubePlaylists = () => {
  const { user, isAuthenticated } = useGoogleAuth();
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.accessToken) {
      loadPlaylists();
    }
  }, [isAuthenticated, user]);

  const loadPlaylists = async () => {
    if (!user?.accessToken) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const youtubeService = new YouTubeService(user.accessToken);
      const userPlaylists = await youtubeService.getUserPlaylists();
      
      setPlaylists(userPlaylists);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки плейлистов';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="glass-effect rounded-lg p-6">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-run-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Загрузка плейлистов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-effect rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-200 mb-4">{error}</p>
          <Button onClick={loadPlaylists} variant="outline">
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Music className="h-5 w-5 text-run-orange" />
        Ваши YouTube плейлисты
      </h3>
      
      {playlists.length === 0 ? (
        <div className="text-center text-white/70">
          <p>У вас пока нет плейлистов на YouTube</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <img
                src={playlist.thumbnails.medium?.url || playlist.thumbnails.default?.url}
                alt={playlist.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate">{playlist.title}</h4>
                {playlist.description && (
                  <p className="text-sm text-white/70 truncate">{playlist.description}</p>
                )}
              </div>
              
              <Button
                size="sm"
                className="bg-run-orange hover:bg-run-orange/80"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
