import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MusicPlayer } from '@/components/MusicPlayer';
import { PlaylistCard } from '@/components/PlaylistCard';
import { RunCalendar } from '@/components/RunCalendar';
import { SongHistory } from '@/components/SongHistory';
import { RunAnalytics } from '@/components/RunAnalytics';
import { InstallPrompt } from '@/components/InstallPrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GoogleAuth } from '@/components/GoogleAuth';
import { YouTubePlaylists } from '@/components/YouTubePlaylists';

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
  }
];

const Index = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <Header />
      <OfflineIndicator />
      <InstallPrompt />
      
      <Tabs defaultValue="music" className="w-full">
        <TabsList className="glass-effect border-none mb-8 p-1">
          <TabsTrigger 
            value="music" 
            className="data-[state=active]:bg-run-orange data-[state=active]:text-white text-white/70 hover:text-white transition-all"
          >
            Музыка
          </TabsTrigger>
          <TabsTrigger 
            value="youtube" 
            className="data-[state=active]:bg-run-orange data-[state=active]:text-white text-white/70 hover:text-white transition-all"
          >
            YouTube
          </TabsTrigger>
          <TabsTrigger 
            value="calendar" 
            className="data-[state=active]:bg-run-orange data-[state=active]:text-white text-white/70 hover:text-white transition-all"
          >
            Календарь
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-run-orange data-[state=active]:text-white text-white/70 hover:text-white transition-all"
          >
            История
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-run-orange data-[state=active]:text-white text-white/70 hover:text-white transition-all"
          >
            Анализ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="music" className="mt-0">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Плейлисты для бега</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {playlists.map((playlist, index) => (
                    <div
                      key={playlist.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PlaylistCard
                        playlist={playlist}
                        onClick={() => setSelectedPlaylist(playlist.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Music player sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <MusicPlayer />
                
                <div className="glass-effect rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Рекомендации</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Energy Boost", genre: "Electronic Mix", bpm: 130 },
                      { name: "Running High", genre: "Pop Hits", bpm: 125 },
                      { name: "Power Run", genre: "Rock Anthems", bpm: 135 }
                    ].map((track, index) => (
                      <div 
                        key={track.name}
                        className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-[1.02] animate-fade-in"
                        style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{track.name}</div>
                            <div className="text-sm text-white/70">{track.genre}</div>
                          </div>
                          <div className="text-run-orange text-sm font-medium">{track.bpm} BPM</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="youtube" className="mt-0">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <YouTubePlaylists />
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <GoogleAuth />
                <MusicPlayer />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <div className="grid lg:grid-cols-2 gap-8">
            <RunCalendar />
            <RunAnalytics />
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <div className="grid lg:grid-cols-2 gap-8">
            <SongHistory />
            <RunAnalytics />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <RunAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
