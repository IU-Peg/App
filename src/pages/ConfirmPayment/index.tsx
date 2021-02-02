import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import QRCode from 'react-native-qrcode-svg';
import { Image } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import IupegLetters from '../../assets/iupeg-letters.png';
import GreenButton from '../../components/GreenButon';
import TextRegular from '../../components/Text/TextRegular';
import {
  scalePercentageToDP as s,
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';
import { useCart } from '../../hooks/useCartContext';

const Container = styled.View`
  flex: 1;
  background: #535353;
  padding-top: ${Constants.statusBarHeight}px;
`;

const Content = styled.View`
  height: ${h('100')}px;
  justify-content: space-around;
  padding: ${s('25')}px ${s('10')}px 0 ${s('10')}px;
  align-items: center;
`;

const Title = styled(TextRegular)`
  color: white;
  font-size: ${s('9')}px;
  text-align: center;
`;

const Section = styled.View`
  width: ${w('65')}px;
  height: ${h('35')}px;
  background: #fafafa;
  justify-content: center;
  align-items: center;

  border-radius: 2px;
`;

const ButtonStyled = styled(GreenButton)`
  padding-bottom: ${s('14.5') + getBottomSpace()}px;
`;

const ConfirmPayment = (): JSX.Element => {
  const { navigate } = useNavigation();
  const { clear } = useCart();

  const handleFinishedPurchase = useCallback(async () => {
    await AsyncStorage.setItem('PaymentConfirm', JSON.stringify('false'));
    navigate('Success');
    clear();
  }, [navigate, clear]);

  return (
    <Container>
      <Content>
        <Title>
          Aponte o leitor para o QR Code e clique em confirmar após passar pelo
          caixa.
        </Title>
        <Section>
          <QRCode size={s('90')} value="Pagamento realizado!" />
        </Section>
        <Image source={IupegLetters} />
        <ButtonStyled title="Confirmar" onPress={handleFinishedPurchase} />
      </Content>
    </Container>
  );
};

export default ConfirmPayment;
