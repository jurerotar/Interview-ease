import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLayout } from '@providers/layout-provider';
import useTranslation from '@utils/hooks/use-translation';
import Navigation from '@components/layout/components/navigation/navigation';
import ExportModal from '@components/layout/components/export-modal/export-modal';
import Button from '@components/common/button/button';

function TopBar() {
  const { openModal } = useLayout();
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 z-10 flex w-full bg-white dark:bg-[#292D32]">
      <div className="flex h-16 w-full justify-between p-4 lg:justify-end 3xl:container 3xl:mx-auto">
        <Button
          aria-label={t('LAYOUT.TOP_BAR.EXPORT_BUTTON.ACCESSIBILITY_LABEL')}
          onClick={() => openModal((
            <ExportModal />
          ))}
        >
          {t('LAYOUT.TOP_BAR.EXPORT_BUTTON.LABEL')}
          <FontAwesomeIcon
            aria-hidden
            icon={faFileExport}
            height={20}
            width={20}
          />
        </Button>
        <button
          className="flex items-center justify-center lg:hidden"
          type="button"
          aria-label={t('LAYOUT.TOP_BAR.MODAL_OPEN_BUTTON.ACCESSIBILITY_LABEL')}
          onClick={() => openModal((
            <Navigation />
          ))}
        >
          <FontAwesomeIcon
            aria-hidden
            className="dark:text-white"
            icon={faBars}
            height={25}
            width={25}
          />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
