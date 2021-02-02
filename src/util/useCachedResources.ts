/* eslint-disable global-require */
import { useEffect, useState } from 'react';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { loadAsync } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const useCachedResources = (): boolean | any => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async (): Promise<void> => {
      try {
        preventAutoHideAsync();

        await loadAsync({
          ...Ionicons.font,
          'sarabun-medium': require('../../assets/fonts/Sarabun-Medium.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
