import React from 'react';
import clsx from 'clsx';
import { useLayout } from '@providers/layout-provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useTranslation from '@utils/hooks/use-translation';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { children } = props;

  const { t } = useTranslation();
  const { isModalShown, setIsModalShown } = useLayout();

  return (
    <aside
      className={clsx(
        isModalShown ? 'pointer-events-auto opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0',
        'lg:w-max-full scrollbar-hide fixed inset-0 z-20 overflow-y-scroll transition-opacity duration-300 lg:pointer-events-auto lg:top-16 lg:h-[calc(100vh-4rem)] lg:max-w-[20rem] lg:opacity-100'
      )}
    >
      <div className="relative m-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-md p-4 dark:bg-[#292D32] lg:m-0 lg:dark:bg-transparent">
        <div className="flex justify-end lg:hidden">
          <button
            type="button"
            aria-label={t('LAYOUT.TOP_BAR.MODAL_CLOSE_BUTTON.ACCESSIBILITY_LABEL')}
            onClick={() => setIsModalShown(false)}
          >
            <FontAwesomeIcon
              aria-hidden
              className="dark:text-white"
              icon={faXmark}
              height={25}
              width={25}
            />
          </button>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
