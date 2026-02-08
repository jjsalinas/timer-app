import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.github.jjsalinas.timer-app',
  appName: 'Timer App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorConsole: {
      enabled: false
    }
  }
};

export default config;
