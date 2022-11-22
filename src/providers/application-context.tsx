import React, { useState, createContext, useContext } from 'react';
import { Topic } from '@interfaces/common';

export type ApplicationContextProps = {
  topics: Topic[];
  children: React.ReactNode;
};

type ApplicationContextValues = {
  topics: Topic[];
  selectedTopic: Topic['id'];
  setSelectedTopic: React.Dispatch<React.SetStateAction<Topic['id']>>;
};

const ApplicationContext = createContext<ApplicationContextValues>({} as never);

const ApplicationProvider: React.FC<ApplicationContextProps> = (props) => {
  const {
    topics,
    children
  } = props;

  const [selectedTopic, setSelectedTopic] = useState<Topic['id']>(() => {
    if (Array.isArray(topics) && topics.length > 0) {
      return topics[0].id;
    }
    return '';
  });

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: ApplicationContextValues = {
    topics,
    selectedTopic,
    setSelectedTopic
  };

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};

const useApplication = () => useContext<ApplicationContextValues>(ApplicationContext);

export { ApplicationProvider, useApplication };
