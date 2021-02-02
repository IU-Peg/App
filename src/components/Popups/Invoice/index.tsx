import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../../util/percentageToDP';
import GreenButton from '../../GreenButon';
import TextSemiBold from '../../Text/TextSemiBold';
import Input from '../../Input';
import { useCart } from '../../../hooks/useCartContext';

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Content = styled.View`
  height: ${h('45')}px;
  background-color: white;
  border-radius: ${s('2')}px;

  align-items: center;
  justify-content: space-evenly;
`;

const BackButtonView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${s('2')}px;
`;

const BackButton = styled.TouchableOpacity`
  height: ${h('1.05')}px;
  width: ${w('16.5')}px;
  background-color: #d8d8d8;
  border-radius: ${s('1.75')}px;
`;

const InputSection = styled.View`
  width: ${w('80')}px;
  top: ${s('5')}px;
`;

const Title = styled(TextSemiBold)`
  color: #595959;
  font-size: ${s('10')}px;
  text-align: center;
`;

const InputStyled = styled(Input)`
  top: ${s('10')}px;
`;

const Buttons = styled.View`
  top: ${s('10')}px;
`;

const Add = styled(GreenButton)``;

const NotAdd = styled(GreenButton)`
  bottom: ${s('10')}px;
`;

const Invoice = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);

  const { navigate } = useNavigation();
  const { clear } = useCart();

  const navigateToLittleMissing = useCallback(async () => {
    setModalVisible(false);
    clear();
    await AsyncStorage.setItem('PaymentConfirm', JSON.stringify('true'));
    navigate('LittleMissing');
  }, [navigate, clear]);

  return (
    <>
      <GreenButton
        title="Finalizar compra"
        onPress={() => setModalVisible(true)}
      />
      <Modal isVisible={isModalVisible}>
        <Container>
          <Content>
            <BackButtonView>
              <BackButton onPress={() => setModalVisible(false)} />
            </BackButtonView>
            <InputSection>
              <Title>CPF/CNPJ na nota?</Title>
              <InputStyled placeholder="CPF/CNPJ" />
            </InputSection>
            <Buttons>
              <Add
                onPress={navigateToLittleMissing}
                title="Adicionar documento"
              />
              <NotAdd
                onPress={navigateToLittleMissing}
                buttonStyle={{
                  backgroundColor: 'white',
                  width: w('85'),
                  height: h('7.65'),
                  marginTop: s('14'),
                }}
                titleStyle={{ color: '#3d8979', fontSize: s('11') }}
                title="Não, obrigado."
              />
            </Buttons>
          </Content>
        </Container>
      </Modal>
    </>
  );
};

export default Invoice;
