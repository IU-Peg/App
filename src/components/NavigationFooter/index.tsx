import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled, { css } from 'styled-components/native';
import { useCart } from '../../hooks/useCartContext';
import TouchableIcon from '../Touchable/TouchableIcon';
import {
  scalePercentageToDP as s,
  heightPercentageToDP as h,
} from '../../util/percentageToDP';
import GoToPaymentButton from '../Touchable/GoToPaymentButton';
import { useAuth } from '../../hooks/useAuth';

interface IconProps {
  isSelected?: boolean;
}

const Footer = styled.View`
  height: ${h('10.5')}px;

  background: #fff;
  box-shadow: 0px -4px 14px rgba(0, 0, 0, 0.06);
  elevation: 15;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const IconStyled = styled(TouchableIcon) <IconProps>`
  margin: 0 ${s('7.5')}px 0 ${s('7.5')}px;

  ${props =>
    props.isSelected &&
    css`
      color: #54d3ad;
    `}
`;

const PaymentIcon = styled.View`
  margin-left: ${s('10')}px;
`;

const NavigationFooter = (): JSX.Element => {
  const [isSelected, setSelected] = useState('shopping');

  const { navigate } = useNavigation();
  const { products } = useCart();
  const { signOut } = useAuth();

  const navigateToFinishOrder = useCallback(() => {
    const checkForProducts = products.length > 0;
    const alertNoProducts = (): void =>
      Alert.alert(
        'Seu carrinho está vazio! Escaneia os produtos para finalizar as compras',
      );

    return checkForProducts ? navigate('FinishOrder') : alertNoProducts();
  }, [navigate, products]);

  const toggleSelected = useCallback(
    text => {
      if (text === 'shopping') {
        setSelected(text);

        const timer = setTimeout(() => navigate('DefaultShopping'), 200);

        return () => clearTimeout(timer);
      }
      if (text === 'card') {
        setSelected(text);

        const timer = setTimeout(() => navigate('Card'), 200);

        return () => clearTimeout(timer);
      }
      if (text === 'settings') {
        setSelected(text);
        signOut();
      }
    },
    [navigate, signOut],
  );

  return (
    <Footer>
      <IconStyled
        isSelected={isSelected === 'shopping'}
        onPress={() => toggleSelected('shopping')}
        iconName="home"
      />
      <IconStyled
        isSelected={isSelected === 'card'}
        onPress={() => toggleSelected('card')}
        iconName="credit-card"
      />
      <IconStyled
        isSelected={isSelected === 'settings'}
        onPress={() => toggleSelected('settings')}
        iconName="settings"
      />
      <PaymentIcon>
        <GoToPaymentButton
          iconName="arrow-right"
          onPress={navigateToFinishOrder}
        />
      </PaymentIcon>
    </Footer>
  );
};

export default NavigationFooter;
