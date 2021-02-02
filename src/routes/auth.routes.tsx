import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../pages/index';

const Auth = createStackNavigator();

const AuthRoutes = (): JSX.Element => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#f9fafb' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
  </Auth.Navigator>
);

export default AuthRoutes;
