import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_LOGGED_IN = 'isLoggedIn';
const STORAGE_DISPLAY_NAME = 'userDisplayName';

export type SessionContextValue = {
  isLoggedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  displayName: string;
  setDisplayName: (name: string) => Promise<void>;
};

export const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayNameState] = useState('');

  const signIn = async () => {
    setLoading(true);
    setIsLoggedIn(true);
    await AsyncStorage.setItem(STORAGE_LOGGED_IN, 'true');
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem(STORAGE_LOGGED_IN);
    setLoading(false);
  };

  const setDisplayName = async (name: string) => {
    const trimmed = name.trim();
    setDisplayNameState(trimmed);
    if (trimmed) {
      await AsyncStorage.setItem(STORAGE_DISPLAY_NAME, trimmed);
    } else {
      await AsyncStorage.removeItem(STORAGE_DISPLAY_NAME);
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      const [stored, nameStored] = await Promise.all([
        AsyncStorage.getItem(STORAGE_LOGGED_IN),
        AsyncStorage.getItem(STORAGE_DISPLAY_NAME),
      ]);
      setIsLoggedIn(stored === 'true');
      setDisplayNameState(nameStored ?? '');
      setLoading(false);
    };
    loadSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, signIn, signOut, loading, displayName, setDisplayName }}
    >
      {children}
    </SessionContext.Provider>
  );
};
