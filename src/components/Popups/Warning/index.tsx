import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import Modal from 'react-native-modal';
import WarningImg from '../../../assets/warning.png';
import { Content, Title, Info } from './styles';
import { widthPercentageToDP as w } from '../../../util/percentageToDP';
import GreenButton from '../../GreenButon';

const Warning = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setModalVisible(true), 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Modal useNativeDriver isVisible={isModalVisible}>
        <Content>
          <Image source={WarningImg} />
          <Title>Atenção!</Title>
          <Info>
            Verifique se os produtos selecionados estão todos no carrinho antes
            de finalizar sua compra.
          </Info>
          <Info>
            Evite constrangimentos na saida e cobranças posteriores em seu
            cartão.
          </Info>

          <GreenButton
            buttonStyle={{ width: w('90'), backgroundColor: '#3D8979' }}
            title="OK"
            onPress={() => setModalVisible(!isModalVisible)}
          />
        </Content>
      </Modal>
    </>
  );
};

export default Warning;
