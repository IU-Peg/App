import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Shopping,
  ProductDetails,
  Card,
  LittleMissing,
  ConfirmPayment,
  Success,
  FinishOrder,
} from '../pages';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState(false);
  useEffect(() => {
    (async () => {
      const getConfirmation = await AsyncStorage.getItem('PaymentConfirm');

      if (getConfirmation) {
        const check = JSON.parse(getConfirmation) === 'true';

        setInitialRoute(check);
      }
    })();
  }, []);

  const initialName = initialRoute ? 'ConfirmPayment' : 'Shopping';
  const initialComponent = initialRoute ? ConfirmPayment : Shopping;

  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f9fafb' },
      }}
    >
      <App.Screen name={initialName} component={initialComponent} />
      <App.Screen name="DefaultShopping" component={Shopping} />
      <App.Screen name="Card" component={Card} />
      <App.Screen
        options={{ gestureEnabled: false }}
        name="ProductDetails"
        component={ProductDetails}
      />
      <App.Screen
        name="LittleMissing"
        component={LittleMissing}
        options={{ gestureEnabled: false }}
      />
      <App.Screen
        name="DefaultConfirmPayment"
        component={ConfirmPayment}
        options={{ gestureEnabled: false }}
      />
      <App.Screen
        name="Success"
        component={Success}
        options={{ gestureEnabled: false }}
      />
      <App.Screen name="FinishOrder" component={FinishOrder} />
    </App.Navigator>
  );
};

export default AppRoutes;
