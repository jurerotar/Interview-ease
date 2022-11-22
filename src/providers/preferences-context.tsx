import React, { useState, createContext, useContext } from 'react';

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

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: PreferencesContextValues = {
    colorScheme,
    setColorScheme
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

const usePreferences = () => useContext<PreferencesContextValues>(PreferencesContext);

export { PreferencesProvider, usePreferences };
