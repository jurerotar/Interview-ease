import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLayout } from '@providers/layout-provider';
import useTranslation from '@utils/hooks/use-translation';
import { download, parseDataFromDOM, stringifyParsedData } from '@utils/helpers';

const exportHandler = (): void => {
  download('Interview recap.txt', stringifyParsedData(parseDataFromDOM()));
};

function TopBar() {
  const { setIsModalShown } = useLayout();
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 z-10 flex w-full bg-white dark:bg-[#292D32]">
      <div className="flex h-16 w-full justify-between p-4 lg:justify-end 3xl:container 3xl:mx-auto">
        <button
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-green-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-green-600"
          type="button"
          aria-label={t('LAYOUT.TOP_BAR.EXPORT_BUTTON.ACCESSIBILITY_LABEL')}
          onClick={exportHandler}
        >
          {t('LAYOUT.TOP_BAR.EXPORT_BUTTON.LABEL')}
          <FontAwesomeIcon
            aria-hidden
            icon={faDownload}
            height={15}
            width={15}
          />
        </button>
        <button
          className="flex items-center justify-center lg:hidden"
          type="button"
          aria-label={t('LAYOUT.TOP_BAR.MODAL_OPEN_BUTTON.ACCESSIBILITY_LABEL')}
          onClick={() => setIsModalShown(true)}
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
