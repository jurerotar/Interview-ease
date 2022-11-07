import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLayout } from '@providers/layout-provider';

const exportHandler = () => {
  const questionBlocks = document.querySelectorAll('[data-block-type="question"]');

  const exportData = Array.from(questionBlocks)
    .map((questionBlock) => {
      const question = questionBlock.querySelector('[data-question]')!.getAttribute('data-question');
      const rating = parseInt(questionBlock.querySelector('[data-rating]')!.getAttribute('data-rating') ?? '0', 10);
      const notes = questionBlock.querySelector('textarea')!.value;
      return {
        question,
        rating,
        notes,
      };
    })
    .filter((data) => data.rating !== 0 || data.notes.length !== 0);
};

function TopBar() {
  const { setIsModalShown } = useLayout();

  return (
    <div className="fixed top-0 left-0 z-10 flex w-full bg-white dark:bg-[#292D32]">
      <div className="flex h-16 w-full justify-between p-4 lg:justify-end 3xl:container 3xl:mx-auto">
        <button
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-green-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-green-600"
          type="button"
          onClick={exportHandler}
        >
          Export
          <FontAwesomeIcon
            icon={faDownload}
            height={15}
            width={15}
          />
        </button>
        <button
          className="flex items-center justify-center lg:hidden"
          type="button"
          onClick={() => setIsModalShown(true)}
        >
          <FontAwesomeIcon
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
