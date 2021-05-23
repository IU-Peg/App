import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useCart } from '../../hooks/useCartContext';
import { formatCoin } from '../../util/formatValue';
import Search from '../Search';
import TextRegular from '../Text/TextRegular';
import {
  CartTitle, Container,

  ItensList, Product,

  ProductDescription,
  ProductList,
  ProductPrice,
  TextName,

  TextPrice, TextQuantity
} from './styles';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  quantity: number;
}

interface ComponentProps {
  toggleSearch?: () => void;
}

const ProductCart: React.FC<ComponentProps> = ({ toggleSearch }) => {
  const [formattedList, setFormattedList] = useState<ProductProps[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [statusCamera, setStatusCamera] = useState(false);

  const { navigate } = useNavigation();
  const { products } = useCart();

  useEffect(() => {
    const formattedData = products.map(dt => {
      return {
        ...dt,
        formattedPrice: formatCoin(dt.price),
      };
    });

    const searchProducts = formattedData.filter(data => {
      return data.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setFormattedList(searchProducts);
  }, [products, searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusCamera(true);
    }, 12000);

    return () => {
      clearTimeout(timer);
    };
  }, [statusCamera]);

  const handleSearch = useCallback(text => {
    setSearchValue(text);
  }, []);

  const navigateToProductDetails = useCallback(
    (id: string) => {
      navigate('ProductDetails', { id });
    },
    [navigate],
  );

  return (
    <Container>
      <CartTitle>Carrinho de compras</CartTitle>
      <Search
        onBlur={toggleSearch}
        onFocus={toggleSearch}
        onChangeText={text => handleSearch(text)}
        value={searchValue}
      />
      <Product>
        <ItensList
          data={formattedList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductList onPress={() => navigateToProductDetails(item.id)}>
              <ProductDescription>
                <TextName>
                  <TextRegular style={{ color: '#a6aab4' }}>Nome: </TextRegular>
                  {item.name}
                </TextName>
                <TextQuantity>{item.quantity} unidade</TextQuantity>
                <ProductPrice>
                  <TextPrice>{item.formattedPrice}</TextPrice>
                </ProductPrice>
              </ProductDescription>
            </ProductList>
          )}
        />
      </Product>
    </Container>
  );
};

export default ProductCart;
