import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { Alert } from 'react-native';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

export type CardData = {
  number: string;
  name: string;
  expiration: string;
  cvv: string;
  favorite?: boolean;
};

type CardContextType = {
  wallet: CardData[];
  addNewCard(card: CardData): Promise<void>;
  removeCard(number: string): Promise<void>;
  setFavoriteCard(number: string): Promise<void>;
};

const CardContext = createContext<CardContextType>({} as CardContextType);

const CardProvider = ({ children }: WithChildren): JSX.Element => {
  const [wallet, setWallet] = useState<CardData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const getCards = await getItemAsync('IupegWallet');
        if (getCards) {
          setWallet(JSON.parse(getCards));
        }
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  const addNewCard = useCallback(
    async (card: CardData) => {
      setWallet([...wallet, { ...card, favorite: false }]);
      await setItemAsync(
        'IupegWallet',
        JSON.stringify([...wallet, { ...card, favorite: false }]),
      );
    },
    [wallet],
  );

  const setFavoriteCard = useCallback(
    async number => {
      const modifyFavorite = wallet
        .map(data => {
          if (data.favorite === true) {
            return { ...data, favorite: false };
          }
          return data;
        })
        .map(data => {
          if (data.number === number) {
            return { ...data, favorite: true };
          }
          return data;
        });

      setWallet(modifyFavorite);

      await setItemAsync('IupegWallet', JSON.stringify(modifyFavorite));
    },
    [wallet],
  );

  const removeCard = useCallback(
    async number => {
      const filterCards = wallet.filter(dt => dt.number !== number);
      setWallet(filterCards);

      await setItemAsync('IupegWallet', JSON.stringify(filterCards));
    },
    [wallet],
  );

  const contextValues = useMemo(
    () => ({
      wallet,
      addNewCard,
      removeCard,
      setFavoriteCard,
    }),
    [wallet, addNewCard, removeCard, setFavoriteCard],
  );

  return (
    <CardContext.Provider value={contextValues}>
      {children}
    </CardContext.Provider>
  );
};

const useCard = (): CardContextType => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }

  return context;
};

export { CardProvider, useCard };
