import React, { useCallback, useRef, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native-animatable';
import { number } from 'card-validator';
import { CardData } from '../../hooks/useCard';
import { scalePercentageToDP as s } from '../../util/percentageToDP';
import CardImg from '../../assets/credit-card.png';
import {
  Container,
  Content,
  BackButton,
  BackButtonView,
  Section,
  Title,
  Total,
  CardIcon,
  CardSection,
  TitleCard,
  InfoCard,
  Swap,
  Options,
  OptionsText,
  OptionsSelected,
} from './styles';
import ProductCart from '../../components/ProductCart';
import Warning from '../../components/Popups/Warning';
import Invoice from '../../components/Popups/Invoice';
import { useCart } from '../../hooks/useCartContext';
import { formatCoin } from '../../util/formatValue';
import { useCard } from '../../hooks/useCard';

interface ContentRef {
  slideOutDown(): void;
}

interface ProductListRef {
  fadeOut(): void;
}

interface CardReturnType {
  number: string;
  type: string | undefined;
}

const FinishOrder = (): JSX.Element => {
  const [isSelected, setSelected] = useState('credito');

  const contentRef = useRef<ContentRef | any>(null);
  const productListRef = useRef<ProductListRef | any>(null);

  const { goBack } = useNavigation();
  const { products } = useCart();
  const { wallet } = useCard();

  const handleBackButton = useCallback(() => {
    contentRef.current.slideOutDown();
    productListRef.current.fadeOut();

    const timer = setTimeout(() => {
      goBack();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [goBack]);

  const totalPrice = useMemo(() => {
    const total = products.reduce((acc, product) => {
      const subtotal = product.price * product.quantity;
      return acc + subtotal;
    }, 0);

    return formatCoin(total);
  }, [products]);

  const formatCard = useMemo(() => {
    const formattedData = (card: CardData): CardReturnType => {
      const lastCardNumber = card?.number.substr(card.number.length - 4);
      const discoveryType = number(card?.number).card?.type;

      return {
        number: lastCardNumber,
        type: discoveryType?.toUpperCase(),
      };
    };

    const findFavorite = wallet.find(data => {
      return data.favorite === true;
    });

    const getCard = wallet.shift();

    if (findFavorite) {
      return formattedData(findFavorite);
    }
    if (getCard) {
      return formattedData(getCard);
    }

    return false;
  }, [wallet]);

  return (
    <Container>
      <View style={{ flex: 1 }} ref={productListRef} useNativeDriver>
        <ProductCart />
      </View>
      <Content ref={contentRef} useNativeDriver animation="slideInUp">
        <BackButtonView>
          <BackButton onPress={handleBackButton} />
        </BackButtonView>
        <Section>
          <Title>Pagamento</Title>
          <Total>Total: {totalPrice}</Total>
        </Section>
        <Section>
          {formatCard && (
            <>
              <CardIcon source={CardImg} />
              <CardSection>
                <TitleCard>Cartão de Crédito/Débito</TitleCard>
                <InfoCard>
                  {formatCard.type} **** {formatCard.number}
                </InfoCard>
              </CardSection>
            </>
          )}
          <Swap>Trocar</Swap>
        </Section>
        <Section style={{ marginTop: s('2'), marginBottom: s('2') }}>
          <Options>
            <OptionsText style={{ marginBottom: s('2') }}>Débito</OptionsText>
            <OptionsText style={{ marginTop: s('2'), marginBottom: s('2') }}>
              Crédito
            </OptionsText>
          </Options>
          <Options>
            <OptionsSelected
              isSelected={isSelected === 'debito'}
              onPress={() => setSelected('debito')}
              style={{ marginBottom: s('2') }}
            />
            <OptionsSelected
              isSelected={isSelected === 'credito'}
              onPress={() => setSelected('credito')}
              style={{ marginTop: s('2'), marginBottom: s('2') }}
            />
          </Options>
        </Section>
        <Invoice />
      </Content>
      <Warning />
    </Container>
  );
};

export default FinishOrder;
