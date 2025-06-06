
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { checkInstallPrompt, isStandalone } from '@/utils/pwa';

export const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    if (isStandalone()) {
      return;
    }

    const { showInstallPrompt } = checkInstallPrompt();
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowPrompt(true);
    });

    // Show prompt after 30 seconds if not installed
    const timer = setTimeout(() => {
      if (!isStandalone()) {
        setShowPrompt(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      console.log(`Пользователь ${outcome === 'accepted' ? 'принял' : 'отклонил'} установку`);
      setShowPrompt(false);
      setInstallPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone()) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-in-right">
      <div className="glass-effect rounded-2xl p-4 text-white max-w-md mx-auto">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-run-orange" />
            <h3 className="font-bold text-sm">Установить приложение</h3>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <p className="text-sm text-white/80 mb-4">
          Установите RunTune для быстрого доступа и работы офлайн
        </p>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleInstall}
            className="bg-run-orange hover:bg-run-orange/90 text-white flex-1"
            size="sm"
          >
            Установить
          </Button>
          <Button 
            onClick={handleDismiss}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            size="sm"
          >
            Позже
          </Button>
        </div>
      </div>
    </div>
  );
};
