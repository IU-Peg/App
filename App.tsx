/* eslint-disable react/style-prop-object */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Sarabun_400Regular as SarabunRegular,
  Sarabun_600SemiBold as SarabunSemiBold,
  useFonts,
} from '@expo-google-fonts/sarabun';
import { AppLoading } from 'expo';
import Routes from './src/routes';
import useCachedResources from './src/util/useCachedResources';
import AppProvider from './src/hooks';

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();

  const [loaded] = useFonts({
    SarabunRegular,
    SarabunSemiBold,
  });

  if (!loaded) {
    return <AppLoading />;
  }

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar
          backgroundColor="#F9FAFB"
          translucent
          style={Platform.OS === 'ios' ? 'inverted' : 'auto'}
        />
        <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
          <Routes />
        </View>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
