import React from 'react';
import Accordion from '@components/accordion/accordion';
import { GroupingStructure, Topic } from '@interfaces/common';
import { useApplication } from '@providers/application-context';
import { removeExtensionFromName } from '@utils/helpers';
import useTranslation from '@utils/hooks/use-translation';

type GroupingProps = {
  name?: GroupingStructure['grouping'];
  topics: Topic[];
}

const Grouping: React.FC<GroupingProps> = (props) => {
  const { name, topics } = props;

  const { t } = useTranslation();
  const { setSelectedTopic } = useApplication();

  const uniqueGroups = Array.from(new Set(topics.map((topic: Topic) => topic.groupingStructure?.group))) as (string | null)[];

  const topicsGroupedByGroups: GroupingProps[] = uniqueGroups.map((group: GroupingStructure['group']) => {
    return {
      name: group,
      topics: topics.filter((topic: Topic) => topic.groupingStructure?.group === group)
    };
  });

  return (
    <>
      <span className="text-xs font-bold uppercase text-gray-400">
        {name === null ? t('LAYOUT.SIDEBAR.UNCATEGORIZED_TOPICS') : name!.slice(1, -1)}
      </span>
      <div className="flex flex-col gap-2 pl-2 border-l-2 border-l-[#3a3b3c]">
        {topicsGroupedByGroups.map((topicGroup) => (
          <Accordion summary={topicGroup?.name ?? t('LAYOUT.SIDEBAR.UNCATEGORIZED_TOPICS')}>
            {topicGroup.topics.map((topic: Topic) => (
              <div
                key={topic.name}
                className="py-2"
              >
                <button
                  onClick={() => setSelectedTopic(topic.id)}
                  type="button"
                  className="p-1 text-sm font-bold uppercase transition-colors duration-300 dark:text-gray-300 hover:dark:text-white"
                >
                  {removeExtensionFromName(topic.name)}
                </button>
              </div>
            ))}
          </Accordion>
        ))}
      </div>
    </>
  );
};

function Navigation() {
  const { topics } = useApplication();

  const uniqueGroupings = Array.from(new Set(topics.map((topic: Topic) => topic.groupingStructure?.grouping))) as (string | null)[];

  const topicsGroupedByGroupings: GroupingProps[] = uniqueGroupings.map((grouping: GroupingStructure['grouping']) => {
    return {
      name: grouping,
      topics: topics.filter((topic: Topic) => topic.groupingStructure?.grouping === grouping)
    };
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {topicsGroupedByGroupings.map((grouping) => (
        <Grouping
          name={grouping.name}
          topics={grouping.topics}
        />
      ))}
    </div>
  );
}

export default Navigation;
