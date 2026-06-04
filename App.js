import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { initDatabase } from './src/database/database';
import Routes from './src/navigation/routes';

export default function App() {

  useEffect(() => {
    if (Platform.OS !== 'web') {
      initDatabase();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
}