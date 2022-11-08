import React, { useEffect, useState, createContext, useContext } from 'react';
import { setCookie } from 'cookies-next';
import CookieNames from '@enums/cookie-names';

type ColorScheme = 'light' | 'dark';

export type PreferencesContextProps = {
  colorScheme: ColorScheme;
  children: React.ReactNode;
};

type PreferencesContextValues = {
  colorScheme: ColorScheme;
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme>>;
};

const PreferencesContext = createContext<PreferencesContextValues>({} as never);

const PreferencesProvider: React.FC<PreferencesContextProps> = (props) => {
  const { colorScheme: colorSchemeProp, children } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemeProp);

  useEffect(() => {
    setCookie(CookieNames.PREFERENCES, colorScheme, {
      sameSite: 'lax',
      maxAge: 3600 * 24 * 12 * 1000
    });
  }, [colorScheme]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: PreferencesContextValues = {
    colorScheme,
    setColorScheme
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

const usePreferences = () => useContext<PreferencesContextValues>(PreferencesContext);

export { PreferencesProvider, usePreferences };
