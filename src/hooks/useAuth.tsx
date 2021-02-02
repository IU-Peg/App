import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GoogleUser, logInAsync } from 'expo-google-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

type AuthState = {
  token: string;
  user: GoogleUser;
};

type SignInTypes = {
  cancelled?: boolean | undefined;
  error?: undefined | boolean;
};

type AuthContextType = {
  signIn(): Promise<string | SignInTypes | null>;
  signOut(): Promise<void>;
  user: GoogleUser;
  loading: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: WithChildren): JSX.Element => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [idToken, user] = await AsyncStorage.multiGet([
        '@Iupeg:token',
        '@Iupeg:user',
      ]);

      if (idToken[1] && user[1]) {
        setData({ token: idToken[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async () => {
    try {
      const result = await logInAsync({
        iosClientId: Constants.manifest.extra.iOsClientId,
        androidClientId: Constants.manifest.extra.androidClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success' && result.accessToken) {
        await AsyncStorage.multiSet([
          ['@Iupeg:token', result.accessToken],
          ['@Iupeg:user', JSON.stringify(result.user)],
        ]);
        setData({ token: result.accessToken, user: result.user });
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Iupeg:token', '@Iupeg:user']);
    setData({} as AuthState);
  }, []);

  const contextValues = useMemo(
    () => ({
      signIn,
      signOut,
      loading,
      user: data.user,
    }),
    [signIn, signOut, loading, data.user],
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
