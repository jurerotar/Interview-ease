import React, { useRef, useState } from 'react';
import { useApplication } from '@providers/application-context';
import useTranslation from '@utils/hooks/use-translation';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { download, parseDataFromDOM, shareByEmail, stringifyParsedData } from '@utils/helpers';
import TextArea from '@components/common/textarea/textarea';
import { Topic } from '@interfaces/common';
import Rating from '@components/common/rating/rating';
import Button from '@components/common/button/button';
import clsx from 'clsx';
import styles from './export-modal.module.scss';

const tabClassNames = {
  className: 'flex py-2 px-4 rounded-md uppercase text-sm font-semibold max-w-[10rem] cursor-pointer transition-colors duration-300',
  selectedClassName: 'bg-gray-800'
};

const TabHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-2xl font-semibold dark:text-white underline decoration-2 decoration-green-500">{children}</h2>
  );
};

const TabSectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-xl font-semibold dark:text-white">
      {children}
    </h3>
  );
};

type RatedTopics = Record<Topic['name'], number | null>;

function ExportModal() {
  const { topics } = useApplication();
  const { t } = useTranslation();

  const parsedQuestions = useRef<string>(stringifyParsedData(parseDataFromDOM()));
  const [ratedTopics, setRatedTopics] = useState<RatedTopics>({});

  const setTopicRating = (rating: number, name: Topic['name']) => {
    setRatedTopics((prevState) => ({
      ...prevState,
      [name]: rating
    }));
  };

  const removeTopicRating = (name: Topic['name']) => {
    const { [name]: propToRemove, ...rest } = ratedTopics;
    setRatedTopics(rest);
  };

  const updateQuestions = (event) => {
    parsedQuestions.current = event.target.value;
  };

  const preview = (): string => {
    let string = '';
    if (Object.keys(ratedTopics).length > 0) {
      string += `\n\n# ${t('EXPORT.REPORT.INDIVIDUAL_TOPIC_RATINGS')}\n\n`;
      Object.keys(ratedTopics).forEach((id: Topic['id']) => {
        const { formattedName } = topics.find((topic: Topic) => topic.id === id)!;
        string += `${formattedName}: ${ratedTopics[id]}/5\n`;
      });
    }
    if (parsedQuestions.current !== '') {
      string += `\n\n# ${t('EXPORT.REPORT.QUESTION_RATINGS')}\n\n${parsedQuestions.current}\n\n`;
    }

    return string.trim();
  };

  return (
    <div className="flex flex-col w-full text-white">
      <Tabs className="flex flex-col w-full">
        <TabList className="flex w-full gap-2">
          <Tab {...tabClassNames}>{t('EXPORT.EDIT_TAB.TAB_LABEL')}</Tab>
          <Tab {...tabClassNames}>{t('EXPORT.PREVIEW_TAB.TAB_LABEL')}</Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col py-4 gap-4">
            <TabHeading>{t('EXPORT.EDIT_TAB.TAB_LABEL')}</TabHeading>
            <div className="flex flex-col gap-2">
              <TabSectionHeading>{t('EXPORT.EDIT_TAB.TOPIC_RATING')}</TabSectionHeading>
              <ul className="flex flex-col gap-2">
                {topics.map((topic: Topic) => (
                  <li className="flex gap-2 items-end">
                    <span
                      className={clsx(styles.subheading, (!!topic.groupingStructure?.grouping || !!topic.groupingStructure?.grouping) && 'pt-6', 'relative dark:text-white font-semibold')}
                      /* eslint-disable-next-line max-len,tailwindcss/no-custom-classname */
                      data-grouping={clsx(topic.groupingStructure?.grouping && `${topic.groupingStructure?.grouping} /`, topic.groupingStructure?.grouping)}
                    >
                      {topic.formattedName}
                    </span>
                    <Rating
                      name={topic.id}
                      value={ratedTopics[topic.id] ?? 0}
                      changeHandler={setTopicRating}
                      deleteHandler={removeTopicRating}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <TabSectionHeading>{t('EXPORT.EDIT_TAB.QUESTIONS_RATINGS_AND_NOTES')}</TabSectionHeading>
              <TextArea
                onChange={updateQuestions}
                value={parsedQuestions.current}
                placeholder={t('EXPORT.EDIT_TAB.EDIT_TEXTAREA_PLACEHOLDER')}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-col py-4 gap-4">
            <TabHeading>{t('EXPORT.PREVIEW_TAB.TAB_LABEL')}</TabHeading>
            <pre className="whitespace-pre-wrap font-sans">
              {parsedQuestions.current === '' && Object.keys(ratedTopics).length === 0 ? (
                <>
                  {t('EXPORT.PREVIEW_TAB.NO_CONTENT_TEXT')}
                </>
              ) : (
                <>
                  {preview()}
                </>
              )}
            </pre>
          </div>
        </TabPanel>
      </Tabs>
      <div className="flex gap-4">
        <Button
          className="w-fit"
          onClick={() => download('.txt', preview())}
        >
          {t('BUTTONS.DOWNLOAD')}
        </Button>
        <Button
          className="w-fit"
          onClick={() => shareByEmail(preview())}
        >
          {t('BUTTONS.EMAIL')}
        </Button>
      </div>
    </div>
  );
}

export default ExportModal;
