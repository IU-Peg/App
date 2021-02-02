/* eslint-disable camelcase */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  products: Product[];
  increment(id: string): void;
  decrement(id: string): void;
  addItem(product: Product): void;
  removeItem(id: string): void;
  clear(): void;
}

const CartContext = createContext<CartContextType | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const getProducts = await AsyncStorage.getItem('@Iupeg:cart');
        if (getProducts) {
          setProducts([...JSON.parse(getProducts)]);
        }
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  const increment = useCallback(
    async id => {
      const newProducts = products.map(data => {
        if (data.id === id) {
          return { ...data, quantity: data.quantity + 1 };
        }
        return data;
      });

      setProducts(newProducts);

      await AsyncStorage.setItem('@Iupeg:cart', JSON.stringify(newProducts));
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const findProduct = products.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      setProducts(findProduct);

      await AsyncStorage.setItem('@Iupeg:cart', JSON.stringify(findProduct));
    },
    [products],
  );

  const addItem = useCallback(
    // eslint-disable-next-line consistent-return
    async (product: Product) => {
      const findProduct = products.find(data => data.id === product.id);

      if (findProduct) {
        return increment(product.id);
      }

      setProducts([...products, { ...product, quantity: 1 }]);

      await AsyncStorage.setItem(
        '@Iupeg:cart',
        JSON.stringify([...products, { ...product, quantity: 1 }]),
      );
    },
    [products, increment],
  );

  const removeItem = useCallback(
    async id => {
      const filterProducts = products.filter(data => data.id !== id);

      setProducts(filterProducts);

      await AsyncStorage.setItem('@Iupeg:cart', JSON.stringify(filterProducts));
    },
    [products],
  );

  const clear = useCallback(async () => {
    setProducts([]);

    await AsyncStorage.removeItem('@Iupeg:cart');
  }, []);

  const contextValues = useMemo(
    () => ({
      decrement,
      increment,
      addItem,
      removeItem,
      clear,
      products,
    }),
    [decrement, increment, addItem, removeItem, clear, products],
  );

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export { CartProvider, useCart, Product };
