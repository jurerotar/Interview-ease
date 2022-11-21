import React, { useState, createContext, useContext, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useTranslation from '@utils/hooks/use-translation';

export type LayoutContextProps = {
  children: React.ReactNode;
};

type LayoutContextValues = {
  // eslint-disable-next-line no-unused-vars
  openModal: (modalContents: React.ReactNode) => void;
  closeModal: () => void;
};

const LayoutContext = createContext<LayoutContextValues>({} as never);

const LayoutProvider: React.FC<LayoutContextProps> = (props) => {
  const { children } = props;

  const { t } = useTranslation();

  // Sidebar is a modal on mobile and tablet devices
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(null);

  const openModal = (modalContents: React.ReactNode): void => {
    setIsModalShown(true);
    setModalChildren(modalContents);
  };

  const closeModal = (): void => {
    setIsModalShown(false);
    setModalChildren(null);
  };

  const value: LayoutContextValues = useMemo(
    () => ({
      openModal,
      closeModal
    }),
    []
  );

  return (
    <LayoutContext.Provider value={value}>
      {isModalShown && (
        <div className="h-screen w-screen fixed z-20 top-0 left-0 backdrop-blur-sm bg-black/50">
          <div className="m-4 shadow-md max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] lg:max-w-[600px] lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 rounded-md pt-8 p-4 md:pt-4 dark:bg-[#080808] relative scrollbar-hide overflow-y-scroll">
            <button
              type="button"
              className="absolute top-4 right-4"
              aria-label={t('LAYOUT.TOP_BAR.MODAL_CLOSE_BUTTON.ACCESSIBILITY_LABEL')}
              onClick={closeModal}
            >
              <FontAwesomeIcon
                aria-hidden
                className="dark:text-white"
                icon={faXmark}
                height={25}
                width={25}
              />
            </button>
            {modalChildren}
          </div>
        </div>
      )}
      {children}
    </LayoutContext.Provider>
  );
};

const useLayout = () => useContext<LayoutContextValues>(LayoutContext);

export { LayoutProvider, useLayout };
