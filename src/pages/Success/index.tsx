import React from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Image } from 'react-native';
import { Button, AirbnbRating } from 'react-native-elements';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import {
  scalePercentageToDP as s,
  heightPercentageToDP as h,
  widthPercentageToDP as w,
} from '../../util/percentageToDP';
import SuccessImg from '../../assets/success.png';
import TextSemiBold from '../../components/Text/TextSemiBold';
import TextRegular from '../../components/Text/TextRegular';

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
  font-size: ${s('15')}px;
  text-align: center;
`;

const EvalutionText = styled(TextRegular)`
  color: #595959;
  font-size: ${s('10')}px;
  text-align: center;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${s('14.5') + getBottomSpace()}px;
`;

const LeftButton = styled(Button)``;

const RightButton = styled(Button)``;

const Success = (): JSX.Element => {
  const styles = {
    button: {
      left: {
        width: w('44'),
        height: h('10.5'),
        borderWidth: s('0.7'),
        borderColor: '#3d8979',
        backgroundColor: 'white',
        borderRadius: s('6'),
      },
      right: {
        width: w('44'),
        height: h('10.5'),
        backgroundColor: '#3d8979',
        borderRadius: s('6'),
      },
    },
    title: {
      left: {
        color: '#3d8979',
        fontFamily: 'SarabunSemiBold',
        fontSize: s('11'),
      },
      right: {
        color: 'white',
        fontFamily: 'SarabunSemiBold',
        fontSize: s('11'),
      },
    },
  };

  const { navigate } = useNavigation();

  return (
    <Container>
      <Content>
        <Title>Sucesso!</Title>
        <Image source={SuccessImg} />
        <EvalutionText>Deixe sua avaliação</EvalutionText>
        <AirbnbRating selectedColor="#3d8979" showRating={false} />
        <Buttons>
          <LeftButton
            buttonStyle={styles.button.left}
            titleStyle={styles.title.left}
            title="Pular"
            onPress={() => navigate('DefaultShopping')}
          />
          <RightButton
            buttonStyle={styles.button.right}
            titleStyle={styles.title.right}
            title="Enviar"
            onPress={() => navigate('DefaultShopping')}
          />
        </Buttons>
      </Content>
    </Container>
  );
};

export default Success;
