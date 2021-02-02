import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import {
  scalePercentageToDP as s,
  heightPercentageToDP as h,
} from '../../util/percentageToDP';
import LittleMissingImg from '../../assets/little-missing.png';
import GreenButton from '../../components/GreenButon';
import TextRegular from '../../components/Text/TextRegular';
import TextSemiBold from '../../components/Text/TextSemiBold';

const Container = styled.View`
  flex: 1;

  background: white;
  padding-top: ${Constants.statusBarHeight}px;
`;

const Content = styled.View`
  height: ${h('100')}px;
  justify-content: space-between;
  padding: ${s('25')}px ${s('10')}px 0 ${s('10')}px;
`;

const Title = styled(TextSemiBold)`
  color: #3d8979;
  font-size: ${s('13')}px;
  text-align: left;
`;

const Info = styled(TextRegular)`
  color: #8f8f8f;
  font-size: ${s('9')}px;
`;

const ButtonStyled = styled(GreenButton)`
  padding-bottom: ${s('14.5') + getBottomSpace()}px;
`;

const LittleMissing = (): JSX.Element => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Content>
        <Title>Falta pouco...</Title>
        <Info>
          Vá até o ponto de confirmação próximo ao caixa e leia o QR Code para
          confirmar sua compra.{' '}
        </Info>
        <Image source={LittleMissingImg} />
        <ButtonStyled
          title="Iniciar confirmação"
          onPress={() => navigate('DefaultConfirmPayment')}
        />
      </Content>
    </Container>
  );
};

export default LittleMissing;
