import React, { Fragment } from 'react';
import clsx from 'clsx';
import { removeExtensionFromName } from '@utils/helpers';
import Divider from '@components/common/divider/divider';
import { useApplication } from '@providers/application-context';
import { Structure, Question as QuestionType } from '@interfaces/common';
import Question from '@components/topic/components/question/question';
import styles from './topic.module.scss';

type TopicProps = {
  topic: Structure;
};

const Topic: React.FC<TopicProps> = (props) => {
  const { topic } = props;

  const { selectedTopic } = useApplication();

  const title = removeExtensionFromName(topic.name);
  const amountOfQuestions = topic.questions.length;

  return (
    <div className={clsx(topic.id === selectedTopic ? 'flex' : 'hidden', styles.topic, 'w-full flex-col gap-4')}>
      <h1 className="text-3xl font-semibold dark:text-white">{title}</h1>
      <span className="dark:text-gray-200">
        {amountOfQuestions}
        questions
      </span>
      <Divider />
      {topic.questions.map((question: QuestionType, index: number) => (
        <Fragment key={question.question}>
          <Question
            topicId={topic.id}
            index={index}
            question={question}
          />
          {index !== topic.questions.length && <Divider />}
        </Fragment>
      ))}
    </div>
  );
};

export default Topic;
