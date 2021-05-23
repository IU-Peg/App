import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useCart } from '../../../hooks/useCartContext';
import { useReduxDispatch, useReduxSelector } from '../../../redux';
import { getProduct } from '../../../redux/actions/cart';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w
} from '../../../util/percentageToDP';
import { Container, Content, ContentButtons, InputStyled } from './styles';

const BarCodeInput = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [EAN, setEANValue] = useState('');
  const dispatch = useReduxDispatch()
  const product = useReduxSelector(state => state.cart.product)
  
  const { addItem } = useCart();

  const sameStyles = {
    height: h('7.5'),
    width: w('32'),
    marginRight: s('11'),
  };

  const handleInputText = useCallback((text: string) => {
    setEANValue(text);
  }, []);

  useEffect(()=>{
    if (product){
      addItem(product);
      setModalVisible(!isModalVisible);
    }
  },[product])
  
  const toggleModalAddItem = useCallback((): void => {
    console.log("EAN " + EAN)
    dispatch(getProduct(EAN))
  }, [isModalVisible, addItem, EAN]);

  const toggleModal = useCallback((): void => {
    setModalVisible(!isModalVisible);
    setEANValue('');
    Keyboard.dismiss();
  }, [isModalVisible]);

  return (
    <>
      <Container>
        <Button
          title="Inserir código de barras"
          onPress={toggleModal}
          buttonStyle={{
            backgroundColor: '#3D8979',
            height: h('6'),
            width: w('60'),
          }}
        />

        <Modal
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          useNativeDriver
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          isVisible={isModalVisible}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Content>
              <InputStyled
                onChangeText={text => handleInputText(text)}
                value={EAN}
                placeholder="Digite o código de barras do produto"
              />
              <ContentButtons>
                <Button
                  buttonStyle={{
                    backgroundColor: '#3D8979',
                    ...sameStyles,
                  }}
                  type="solid"
                  title="Ok"
                  onPress={toggleModalAddItem}
                />
                <Button
                  type="solid"
                  title="Voltar"
                  onPress={toggleModal}
                  buttonStyle={{
                    backgroundColor: '#EA1D2C',
                    ...sameStyles,
                  }}
                />
              </ContentButtons>
            </Content>
          </TouchableWithoutFeedback>
        </Modal>
      </Container>
    </>
  );
};

export default BarCodeInput;
