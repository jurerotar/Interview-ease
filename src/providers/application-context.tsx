import React, { useState, createContext, useContext } from 'react';
import { Structure } from '@interfaces/common';

const flattenStructure = (structureArray: Structure[]) => {
  const flattenedStructure: Structure[] = [];

  const traverse = (array: Structure[]) => {
    array.forEach((structure: Structure) => {
      if (structure.hasOwnProperty('children')) {
        traverse(structure.children);
      }
      if (structure.hasOwnProperty('id')) {
        flattenedStructure.push(structure);
      }
    });
  };

  traverse(structureArray);

  return flattenedStructure;
};

export type ApplicationContextProps = {
  structure: Structure[];
  children: React.ReactNode;
};

type ApplicationContextValues = {
  structure: Structure[];
  selectedTopic: Structure['id'];
  setSelectedTopic: React.Dispatch<React.SetStateAction<Structure['id']>>;
  flattenedTopics: Structure[];
};

const ApplicationContext = createContext<ApplicationContextValues>({} as never);

const ApplicationProvider: React.FC<ApplicationContextProps> = (props) => {
  const { structure, children } = props;

  const [flattenedTopics] = useState<Structure[]>(flattenStructure(structure));
  const [selectedTopic, setSelectedTopic] = useState<Structure['id']>(flattenedTopics[0]?.id ?? '');

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: ApplicationContextValues = {
    flattenedTopics,
    selectedTopic,
    setSelectedTopic,
    structure
  };

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};

const useApplication = () => useContext<ApplicationContextValues>(ApplicationContext);

export { ApplicationProvider, useApplication };
