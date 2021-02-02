import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';
import JackDanielsImg from '../../assets/jack-daniels.png';
import { useCart } from '../../hooks/useCartContext';
import { formatCoin } from '../../util/formatValue';
import {
  Container,
  Header,
  IconBackToShopping,
  ScrollContainer,
  ProductContainer,
  Product,
  ProductImageContainer,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductPricing,
  TotalContainer,
  TotalTitle,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  IconDecrement,
  AdittionalItemText,
  IconIncrement,
  FinishOrderButton,
  ButtonText,
  IconContainer,
  IconCheck,
} from './styles';

interface ProcuctDetailsType {
  id: string;
  name: string;
  price: number;
  description: string;
  formattedPrice?: string;
  quantity: number;
}

interface Params {
  id: string;
}

const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState(
    {} as ProcuctDetailsType,
  );

  const { products, decrement, increment, removeItem } = useCart();
  const { params } = useRoute();
  const { goBack } = useNavigation();

  const routeParams = params as Params;

  useEffect((): void => {
    const formattedData: any = products?.find(dt => {
      if (dt.id === routeParams.id) {
        return {
          ...dt,
          formattedPrice: formatCoin(dt.price),
        };
      }
    });

    setProductDetails(formattedData);
  }, [products, routeParams.id]);

  const handleDecrement = useCallback(
    id => {
      if (productDetails && productDetails.quantity >= 1) {
        decrement(id);
      }
    },
    [productDetails, decrement],
  );

  const navigateToShopping = useCallback(() => {
    if (productDetails.quantity === 0) {
      removeItem(productDetails.id);
      goBack();
    } else {
      goBack();
    }
  }, [productDetails, removeItem, goBack]);

  // eslint-disable-next-line consistent-return
  const totalProductPrice = useMemo(() => {
    if (productDetails) {
      return formatCoin(productDetails.quantity * productDetails.price);
    }
  }, [productDetails]);

  return (
    <Container>
      <Header>
        <IconBackToShopping />
      </Header>

      {productDetails && (
        <ScrollContainer>
          <ProductContainer>
            <Product>
              <ProductImageContainer>
                <Image style={{ margin: 20 }} source={JackDanielsImg} />
              </ProductImageContainer>

              <ProductContent>
                <ProductTitle>{productDetails.name}</ProductTitle>
                <ProductDescription>
                  {productDetails.description}
                </ProductDescription>
                <ProductPricing>{productDetails.formattedPrice}</ProductPricing>
              </ProductContent>
            </Product>
          </ProductContainer>

          <TotalContainer>
            <TotalTitle>Total do produto</TotalTitle>

            <PriceButtonContainer>
              <TotalPrice>{totalProductPrice}</TotalPrice>

              <QuantityContainer>
                <IconDecrement
                  onPress={() => handleDecrement(productDetails.id)}
                  iconName="minus"
                />
                <AdittionalItemText>
                  {productDetails.quantity}
                </AdittionalItemText>
                <IconIncrement
                  iconName="plus"
                  onPress={() => increment(productDetails.id)}
                />
              </QuantityContainer>
            </PriceButtonContainer>

            <FinishOrderButton onPress={navigateToShopping}>
              <ButtonText>Confirmar</ButtonText>
              <IconContainer>
                <IconCheck iconName="check-square" />
              </IconContainer>
            </FinishOrderButton>
          </TotalContainer>
        </ScrollContainer>
      )}
    </Container>
  );
};

export default ProductDetails;
