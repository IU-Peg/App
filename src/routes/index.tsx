import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useReduxSelector } from '../redux';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  return <AppRoutes />
  const { user, loading } = useAuth();  if (loading) {
    return (
      <View>
        <ActivityIndicator size="small" color="#3D8979" />
      </View>
    );
  }
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
