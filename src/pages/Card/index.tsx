import React, { useCallback, useState, useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import { replace } from 'ramda';
import {
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Yup from 'yup';
import { scalePercentageToDP as s } from '../../util/percentageToDP';
import InfoExpiringDateAndCVV from '../../components/Popups/InfoExpiringDateAndCVV';
import TextSemiBold from '../../components/Text/TextSemiBold';
import GreenButton from '../../components/GreenButon';
import {
  Container,
  Header,
  Content,
  StyledIcon,
  CardNumberContent,
  CardNumber,
  CardIcon,
  Section,
  SectionContent,
  InfoIcon,
  ExpiringDateAndCVV,
  CardName,
} from './styles';
import { useCard } from '../../hooks/useCard';
import { schemaValidation } from '../../validators/cardValidator';
import {
  formatCardNumber,
  formatExpiringDate,
} from '../../util/FormatterInputCard';
import { getValidationErrors } from '../../util/getValidationErrors';
import NavigationFooter from '../../components/NavigationFooter';

type ErrorsType = {
  number: boolean;
  name: boolean;
  expiration: boolean;
  cvv: boolean;
};

type CardDataTypes = {
  number: string;
  name: string;
  expiration: string;
  cvv: string;
  type?: string;
};

const Card = (): JSX.Element => {
  const [modalExpiringDate, setModalExpiringDate] = useState(false);
  const [modalCVV, setModalCVV] = useState(false);
  const [cardData, setCardData] = useState({} as CardDataTypes);
  const [errors, setErrors] = useState<ErrorsType>({
    number: false,
    name: false,
    cvv: false,
    expiration: false,
  });

  const formRef = useRef<FormHandles>(null);

  const { goBack } = useNavigation();
  const { addNewCard, wallet } = useCard();

  const toggleModalExpiringDate = useCallback(() => {
    setModalExpiringDate(!modalExpiringDate);
  }, [modalExpiringDate]);

  const toggleModalCVV = useCallback(() => {
    setModalCVV(!modalCVV);
  }, [modalCVV]);

  const validateField = useCallback((name: string, value: any) => {
    const values: any = { [name]: value };
    const response = {
      isPotentiallyValid: false,
      isValid: false,
      error: null,
    };

    try {
      schemaValidation.validateSyncAt(name, values, {
        context: { runtime: true },
      });
      response.isPotentiallyValid = true;

      schemaValidation.validateSyncAt(name, values, {
        context: { runtime: false },
      });
      response.isValid = true;

      setErrors(prev => ({
        ...prev,
        [name]: response.isPotentiallyValid ? false : response.isValid,
      }));
    } catch (validationError) {
      setErrors(prev => ({
        ...prev,
        [name]: response.isPotentiallyValid ? false : validationError,
      }));
    }

    return response;
  }, []);

  const handleInputChange = useCallback(
    (name, text) => {
      validateField(name, text);

      if (name === 'number') {
        const formatted = formatCardNumber(text);
        setCardData(prev => ({ ...prev, [name]: formatted }));
      } else if (name === 'expiration') {
        const formatted = formatExpiringDate(text);
        setCardData(prev => ({ ...prev, [name]: formatted }));
      } else {
        setCardData(prev => ({ ...prev, [name]: text }));
      }
    },
    [validateField],
  );

  const handleSubmitNewCard = useCallback(() => {
    try {
      const formatNumber = replace(/\s+/g, '', cardData.number);
      formRef.current?.setErrors({});

      schemaValidation.validateSync(cardData, {
        context: { runtime: false },
        abortEarly: false,
      });

      const checkCard = wallet.filter(dt => dt.number === formatNumber);

      if (checkCard.length > 0) {
        Alert.alert(
          'Você já possui esse cartão em sua carteira, verifique o número do cartão',
        );
      } else {
        addNewCard({ ...cardData, number: formatNumber });

        Alert.alert('Cartão salvo!', 'Cartão salvo em sua carteira.');
        goBack();
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const getErrors = getValidationErrors(err);
        formRef.current?.setErrors(getErrors);

        Alert.alert(
          'Erro ao salvar cartão',
          'Ocorreu um erro ao salvar, verifique novamente as credenciais',
        );
      }
    }
  }, [cardData, goBack, addNewCard, wallet]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <StyledIcon onPress={() => goBack()} iconName="arrow-left" />
            <TextSemiBold
              style={{
                fontSize: s('12'),
                marginBottom: s('14'),
              }}
            >
              Adicione um cartão
            </TextSemiBold>
          </Header>
          <Content>
            <Form ref={formRef} onSubmit={handleSubmitNewCard}>
              <CardNumberContent>
                <CardNumber
                  name="number"
                  maxLength={19}
                  placeholder="Número do cartão"
                  onChangeText={text => handleInputChange('number', text)}
                  autoCompleteType="cc-number"
                  keyboardType="numeric"
                  textContentType="creditCardNumber"
                  autoFocus
                  value={cardData.number}
                  style={{ color: errors.number ? '#EA1D2C' : 'black' }}
                  autoCorrect={false}
                  blurOnSubmit={false}
                />
                <CardIcon
                  iconName="credit-card"
                  containerStyles={{
                    color: errors.number ? '#EA1D2C' : 'black',
                  }}
                />
              </CardNumberContent>
              <Section>
                <SectionContent>
                  <ExpiringDateAndCVV
                    name="expiration"
                    autoCorrect={false}
                    blurOnSubmit={false}
                    maxLength={5}
                    style={{ color: errors.expiration ? '#EA1D2C' : 'black' }}
                    autoCompleteType="cc-exp"
                    value={cardData.expiration}
                    onChangeText={text => handleInputChange('expiration', text)}
                    keyboardType="numeric"
                    placeholder="MM/AA"
                  />
                  <InfoIcon
                    onPress={toggleModalExpiringDate}
                    iconName="info"
                    containerStyles={{
                      color: errors.expiration ? '#EA1D2C' : 'black',
                    }}
                  />
                  <InfoExpiringDateAndCVV
                    iconName="credit-card"
                    title="Data de vencimento"
                    info="Essa data está na frente do cartão."
                    isVisible={modalExpiringDate}
                  />
                </SectionContent>
                <SectionContent>
                  <ExpiringDateAndCVV
                    name="cvv"
                    placeholder="123"
                    maxLength={3}
                    onChangeText={text => handleInputChange('cvv', text)}
                    style={{ color: errors.cvv ? '#EA1D2C' : 'black' }}
                    autoCompleteType="cc-csc"
                    keyboardType="numeric"
                    autoCorrect={false}
                    blurOnSubmit={false}
                  />
                  <InfoIcon
                    onPress={toggleModalCVV}
                    iconName="info"
                    containerStyles={{
                      color: errors.cvv ? '#EA1D2C' : 'black',
                    }}
                  />
                  <InfoExpiringDateAndCVV
                    iconName="credit-card"
                    title="CVV"
                    info="O código de 3 dígitos está localizado no verso do seu cartão."
                    isVisible={modalCVV}
                  />
                </SectionContent>
              </Section>
              <CardName
                name="name"
                onChangeText={text => handleInputChange('name', text)}
                style={{ color: errors.name ? '#EA1D2C' : 'black' }}
                placeholder="Nome do titular"
                textContentType="name"
                autoCorrect={false}
                blurOnSubmit={false}
                onSubmitEditing={() => formRef.current?.submitForm()}
                returnKeyType="send"
                autoCapitalize="characters"
              />
            </Form>
          </Content>
          <GreenButton
            title="Salvar"
            onPress={() => formRef.current?.submitForm()}
          />
        </Container>
      </TouchableWithoutFeedback>
      <NavigationFooter />
    </>
  );
};

export default Card;
