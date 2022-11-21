import React, { HTMLAttributes } from 'react';
import Accordion from '@components/accordion/accordion';
import { GroupingStructure, Topic } from '@interfaces/common';
import { useApplication } from '@providers/application-context';
import useTranslation from '@utils/hooks/use-translation';
import clsx from 'clsx';

type TopicButtonProps = {
  isSelected: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

const TopicButton: React.FC<TopicButtonProps> = (props) => {
  const { children, isSelected, ...rest } = props;

  return (
    <button
      type="button"
      className={clsx(isSelected && 'underline decoration-green-400 decoration-2', 'p-1 w-fit text-sm font-bold uppercase transition-colors duration-300 dark:text-gray-300 hover:dark:text-white')}
      {...rest}
    >
      {children}
    </button>
  );
};

type GroupingProps = {
  name?: GroupingStructure['grouping'];
  topics: Topic[];
}

const Grouping: React.FC<GroupingProps> = (props) => {
  const { name, topics } = props;

  const { t } = useTranslation();
  const { selectedTopic, setSelectedTopic } = useApplication();

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
        {name === null ? t('LAYOUT.SIDEBAR.UNCATEGORIZED_TOPICS') : name}
      </span>
      <div className="flex flex-col gap-2 pl-2 border-l-2 border-l-[#3a3b3c]">
        {topicsGroupedByGroups.map((topicGroup) => (
          <Accordion
            key={topicGroup.name}
            summary={topicGroup?.name ?? t('LAYOUT.SIDEBAR.UNCATEGORIZED_TOPICS')}
          >
            {topicGroup.topics.map((topic: Topic) => (
              <div
                key={topic.name}
                className="py-2"
              >
                <TopicButton
                  isSelected={selectedTopic === topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  {topic.formattedName}
                </TopicButton>
              </div>
            ))}
          </Accordion>
        ))}
      </div>
    </>
  );
};

function Navigation() {
  const { topics, selectedTopic, setSelectedTopic } = useApplication();

  const [candidateTopic] = topics.filter((topic: Topic) => topic.name === 'Candidate.md');
  const topicsWithoutCandidateTopic = topics.filter((topic: Topic) => topic.name !== 'Candidate.md');

  const uniqueGroupings = Array.from(new Set(topicsWithoutCandidateTopic.map((topic: Topic) => {
    return topic.groupingStructure?.grouping;
  }))) as (string | null)[];

  const topicsGroupedByGroupings: GroupingProps[] = uniqueGroupings.map((grouping: GroupingStructure['grouping']) => {
    return {
      name: grouping,
      topics: topicsWithoutCandidateTopic.filter((topic: Topic) => topic.groupingStructure?.grouping === grouping)
    };
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {candidateTopic && (
        <TopicButton
          isSelected={selectedTopic === candidateTopic.id}
          onClick={() => setSelectedTopic(candidateTopic.id)}
        >
          {candidateTopic.formattedName}
        </TopicButton>
      )}

      {topicsGroupedByGroupings.map((grouping) => (
        <Grouping
          name={grouping.name}
          topics={grouping.topics}
          key={grouping.name}
        />
      ))}
    </div>
  );
}

export default Navigation;
