
import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Playlist {
  id: number;
  title: string;
  description: string;
  trackCount: number;
  duration: string;
  category: string;
}

interface PlaylistCardProps {
  playlist: Playlist;
  onClick?: () => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick }) => {
  return (
    <div 
      className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="gradient-purple-pink rounded-lg h-32 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30">
            <Play className="w-5 h-5 text-white" />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white font-medium">
            {playlist.category}
          </span>
        </div>
      </div>
      
      <h3 className="text-white font-bold text-lg mb-1">{playlist.title}</h3>
      <p className="text-white/70 text-sm mb-2">{playlist.description}</p>
      <div className="flex justify-between text-xs text-white/60">
        <span>{playlist.trackCount} треков</span>
        <span>{playlist.duration}</span>
      </div>
    </div>
  );
};
