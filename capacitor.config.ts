
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.ea5b061e1ac346febc42707cd81651d1',
  appName: 'RunTune Groove',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://ea5b061e-1ac3-46fe-bc42-707cd81651d1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'],
      serverClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
