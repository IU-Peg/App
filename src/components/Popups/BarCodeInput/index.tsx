import React, { useCallback, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useCart } from '../../../hooks/useCartContext';
import findProductByID from '../../../util/findProductByID';
import { Container, Content, InputStyled, ContentButtons } from './styles';
import {
  heightPercentageToDP as h,
  scalePercentageToDP as s,
  widthPercentageToDP as w,
} from '../../../util/percentageToDP';

const BarCodeInput = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { addItem } = useCart();

  const sameStyles = {
    height: h('7.5'),
    width: w('32'),
    marginRight: s('11'),
  };

  const handleInputText = useCallback((text: string) => {
    setInputValue(text);
  }, []);

  const toggleModalAddItem = useCallback((): void => {
    const product = findProductByID(inputValue);
    setInputValue('');
    Keyboard.dismiss();

    const succes = (): void => {
      addItem(product);
      setModalVisible(!isModalVisible);
    };

    const notFound = (): void => {
      Alert.alert(
        'Erro no código de barras',
        'Ocorreu um erro ao encontrar o código de barras, tente novamente',
      );
    };

    return product ? succes() : notFound();
  }, [isModalVisible, addItem, inputValue]);

  const toggleModal = useCallback((): void => {
    setModalVisible(!isModalVisible);
    setInputValue('');
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
                value={inputValue}
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
