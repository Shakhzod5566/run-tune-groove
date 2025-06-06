
import React from 'react';
import { Music } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="glass-effect rounded-2xl p-6 mb-8 text-white">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl gradient-purple-orange flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">RunTune</h1>
          <p className="text-white/70">Музыка для твоих пробежек</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-run-orange">12.5</div>
          <div className="text-sm text-white/70">км сегодня</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-run-orange">5:45</div>
          <div className="text-sm text-white/70">темп/км</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-run-orange">128</div>
          <div className="text-sm text-white/70">BPM</div>
        </div>
      </div>
    </header>
  );
};
