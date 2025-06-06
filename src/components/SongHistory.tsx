
import React, { useState } from 'react';
import { History, Play, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SongPlay {
  id: number;
  title: string;
  artist: string;
  playedAt: string;
  duration: string;
  bpm: number;
  runDistance: number;
  runPace: string;
}

const mockSongHistory: SongPlay[] = [
  {
    id: 1,
    title: "Energy Boost",
    artist: "Fitness Beats",
    playedAt: "2024-06-06T08:15:00",
    duration: "3:45",
    bpm: 128,
    runDistance: 2.1,
    runPace: "5:30"
  },
  {
    id: 2,
    title: "Running High",
    artist: "Pop Hits",
    playedAt: "2024-06-06T08:19:00",
    duration: "4:12",
    bpm: 125,
    runDistance: 2.8,
    runPace: "5:35"
  },
  {
    id: 3,
    title: "Power Run",
    artist: "Rock Anthems",
    playedAt: "2024-06-06T08:24:00",
    duration: "3:28",
    bpm: 135,
    runDistance: 3.5,
    runPace: "5:25"
  },
  {
    id: 4,
    title: "Motivation Mix",
    artist: "Electronic Vibes",
    playedAt: "2024-06-05T07:45:00",
    duration: "4:01",
    bpm: 130,
    runDistance: 1.9,
    runPace: "5:40"
  },
  {
    id: 5,
    title: "Sprint Mode",
    artist: "Hardcore Beats",
    playedAt: "2024-06-05T07:50:00",
    duration: "3:15",
    bpm: 140,
    runDistance: 2.2,
    runPace: "5:20"
  }
];

export const SongHistory: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };

  const filteredHistory = mockSongHistory.filter(song => {
    const songDate = new Date(song.playedAt);
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'today':
        return songDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return songDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return songDate >= monthAgo;
      default:
        return true;
    }
  });

  return (
    <div className="glass-effect rounded-2xl p-6 text-white animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center">
            <History className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">История песен</h2>
        </div>
        
        <div className="flex space-x-2">
          {(['today', 'week', 'month'] as const).map((period) => (
            <Button
              key={period}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={`
                text-sm transition-all duration-200
                ${selectedPeriod === period 
                  ? 'bg-run-orange text-white hover:bg-run-orange/90' 
                  : 'text-white/70 hover:bg-white/20 hover:text-white'
                }
              `}
            >
              {period === 'today' && 'Сегодня'}
              {period === 'week' && 'Неделя'}
              {period === 'month' && 'Месяц'}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredHistory.map((song, index) => (
          <div
            key={song.id}
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-bold text-white group-hover:text-run-orange transition-colors">
                    {song.title}
                  </h3>
                  <span className="text-xs bg-run-orange/30 px-2 py-1 rounded-full text-run-orange font-medium">
                    {song.bpm} BPM
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-1">{song.artist}</p>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(song.playedAt)} в {formatTime(song.playedAt)}</span>
                  </div>
                  <span>•</span>
                  <span>{song.duration}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{song.runDistance} км</span>
                  </div>
                  <span>•</span>
                  <span>{song.runPace}/км</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-run-orange/20 hover:scale-110"
              >
                <Play className="w-4 h-4 text-run-orange" />
              </Button>
            </div>
          </div>
        ))}
        
        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <History className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60">Нет данных за выбранный период</p>
          </div>
        )}
      </div>
    </div>
  );
};
