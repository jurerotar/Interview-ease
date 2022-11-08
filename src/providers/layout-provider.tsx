import React, { useState, createContext, useContext } from 'react';

export type LayoutContextProps = {
  children: React.ReactNode;
};

type LayoutContextValues = {
  isModalShown: boolean;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutContext = createContext<LayoutContextValues>({} as never);

const LayoutProvider: React.FC<LayoutContextProps> = (props) => {
  const { children } = props;

  // Sidebar is a modal on mobile and tablet devices
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: LayoutContextValues = {
    isModalShown,
    setIsModalShown
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

const useLayout = () => useContext<LayoutContextValues>(LayoutContext);

export { LayoutProvider, useLayout };
