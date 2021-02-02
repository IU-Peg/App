import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './useCartContext';
import { CameraPermissionProvider } from './useCameraPermission';
import { AuthProvider } from './useAuth';
import { CardProvider } from './useCard';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <CameraPermissionProvider>
          <CardProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </CardProvider>
        </CameraPermissionProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppProvider;
