import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import AnimatedContentHeader from '../../components/Animatable/AnimatedContentHeader';
import Scanner from '../../components/Scanner';
import BarCodeInput from '../../components/Popups/BarCodeInput';
import ProductCart from '../../components/ProductCart';
import { formatCoin } from '../../util/formatValue';
import { Container, Header, HeaderTitle, TotalValueText } from './styles';
import { useCart } from '../../hooks/useCartContext';
import NavigationFooter from '../../components/NavigationFooter';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  quantity: number;
}

interface HeaderRef {
  fadeInUp(): void;
}

const Shopping: React.FC = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [statusCamera, setStatusCamera] = useState(false);

  const headerRef = useRef<HeaderRef | any>(null);

  const { products } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusCamera(true);
    }, 12000);

    return () => {
      clearTimeout(timer);
    };
  }, [statusCamera]);

  const toggleSearch = useCallback(() => {
    setSearchFocus(!searchFocus);
    if (headerRef) {
      headerRef.current?.fadeInUp();
    }
  }, [searchFocus]);

  const toggleStatusCamera = useCallback(() => setStatusCamera(false), []);

  const totalPrice = useMemo(() => {
    const total = products.reduce((acc, product) => {
      const subtotal = product.price * product.quantity;
      return acc + subtotal;
    }, 0);

    return formatCoin(total);
  }, [products]);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={toggleStatusCamera}>
        <Header
          ref={headerRef}
          delay={3000}
          useNativeDriver
          isSelected={searchFocus}
        >
          <AnimatedContentHeader statusCamera={statusCamera}>
            <HeaderTitle>Valor da compra</HeaderTitle>
            <TotalValueText>{totalPrice}</TotalValueText>
          </AnimatedContentHeader>
          <Scanner statusCamera={statusCamera} />
          <BarCodeInput />
        </Header>
      </TouchableWithoutFeedback>
      <ProductCart toggleSearch={toggleSearch} />
      <NavigationFooter />
    </Container>
  );
};

export default Shopping;
