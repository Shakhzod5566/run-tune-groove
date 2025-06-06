
import React, { useState } from 'react';
import { Play, SkipBack, SkipForward, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  bpm: number;
}

interface MusicPlayerProps {
  currentTrack?: Track;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  currentTrack = {
    id: 1,
    title: "High Energy Run",
    artist: "Fitness Beats",
    duration: "3:45",
    bpm: 128
  }
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45);

  return (
    <div className="glass-effect rounded-2xl p-6 text-white">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-xl gradient-purple-orange flex items-center justify-center">
          <Music className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{currentTrack.title}</h3>
          <p className="text-white/70">{currentTrack.artist}</p>
          <p className="text-sm text-run-orange font-medium">{currentTrack.bpm} BPM</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div 
            className="gradient-purple-orange h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-white/70">
          <span>1:42</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <SkipBack className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 rounded-full gradient-purple-orange hover:scale-105 transition-all animate-pulse-glow"
        >
          <Play className={`w-8 h-8 ${isPlaying ? 'animate-pulse' : ''}`} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <SkipForward className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};
