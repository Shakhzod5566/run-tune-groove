
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MusicPlayer } from '@/components/MusicPlayer';
import { PlaylistCard } from '@/components/PlaylistCard';

const playlists = [
  {
    id: 1,
    title: "Быстрый темп",
    description: "Энергичные треки для интенсивных тренировок",
    trackCount: 25,
    duration: "1ч 45м",
    category: "Интенсив"
  },
  {
    id: 2,
    title: "Утренняя пробежка",
    description: "Мягкий старт дня с мотивирующей музыкой",
    trackCount: 18,
    duration: "1ч 12м",
    category: "Утро"
  },
  {
    id: 3,
    title: "Марафон",
    description: "Длительные треки для долгих дистанций",
    trackCount: 30,
    duration: "2ч 15м",
    category: "Выносливость"
  },
  {
    id: 4,
    title: "Интервалы",
    description: "Ритмичная музыка для интервальных тренировок",
    trackCount: 20,
    duration: "1ч 25м",
    category: "HIIT"
  },
  {
    id: 5,
    title: "Восстановление",
    description: "Спокойные треки для легких пробежек",
    trackCount: 15,
    duration: "58м",
    category: "Восстановление"
  },
  {
    id: 6,
    title: "Вечерний бег",
    description: "Атмосферная музыка для вечерних пробежек",
    trackCount: 22,
    duration: "1ч 35м",
    category: "Вечер"
  }
];

const Index = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto">
      <Header />
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Плейлисты для бега</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onClick={() => setSelectedPlaylist(playlist.id)}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Music player sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <MusicPlayer />
            
            <div className="mt-6 glass-effect rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Рекомендации</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Energy Boost</div>
                      <div className="text-sm text-white/70">Electronic Mix</div>
                    </div>
                    <div className="text-run-orange text-sm font-medium">130 BPM</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Running High</div>
                      <div className="text-sm text-white/70">Pop Hits</div>
                    </div>
                    <div className="text-run-orange text-sm font-medium">125 BPM</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Power Run</div>
                      <div className="text-sm text-white/70">Rock Anthems</div>
                    </div>
                    <div className="text-run-orange text-sm font-medium">135 BPM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
