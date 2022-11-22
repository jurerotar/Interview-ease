import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import Divider from '@components/common/divider/divider';
import { useApplication } from '@providers/application-context';
import { Question as QuestionType, Topic as TopicType } from '@interfaces/common';
import Question from '@components/topic/components/question/question';
import NewQuestionForm from '@components/topic/components/new-question-form/new-question-form';
import Paragraph from '@components/common/text/paragraph/paragraph';
import useTranslation from '@utils/hooks/use-translation';
import styles from './topic.module.scss';

type TopicProps = {
  topic: TopicType;
};

const Topic: React.FC<TopicProps> = (props) => {
  const { topic } = props;
  const { t } = useTranslation();

  const { selectedTopic } = useApplication();

  const [questions, setQuestions] = useState<QuestionType[]>(topic.questions!);

  const amountOfQuestions: number = questions.length;
  const hasAddedAdditionalQuestions: boolean = topic.questions!.length !== questions.length;

  const addNewQuestion = (question: QuestionType) => {
    setQuestions((prevState) => [...prevState, question]);
  };

  return (
    <div
      data-block-type="topic"
      className={clsx(topic.id === selectedTopic ? 'flex' : 'hidden', styles.topic, 'w-full flex-col gap-4')}
    >
      <h2 className="text-3xl font-semibold dark:text-white underline underline-offset-2 decoration-2 decoration-green-500">
        {!!topic.groupingStructure?.group && (
          `${topic.groupingStructure.group} / `
        )}
        {topic.formattedName}
      </h2>
      <span className="dark:text-gray-200">{t('TOPIC.AMOUNT_OF_QUESTIONS', { amountOfQuestions })}</span>
      <Divider />
      {questions.map((question: QuestionType, index: number) => (
        <Fragment key={question.question}>
          <Question
            topicId={topic.id}
            index={index}
            question={question}
            showRatings={topic.formattedName !== 'Candidate'}
          />
          {index !== questions.length && <Divider />}
        </Fragment>
      ))}
      <div className="flex flex-col gap-4">
        <Paragraph className="text-xl font-semibold">
          {t(hasAddedAdditionalQuestions ? 'TOPIC.ADD_NEW_QUESTION.ADD_SUBSEQUENT_QUESTION' : 'TOPIC.ADD_NEW_QUESTION.ADD_FIRST_QUESTION')}
        </Paragraph>
        <NewQuestionForm submitHandler={addNewQuestion} />
      </div>
    </div>
  );
};

export default Topic;
