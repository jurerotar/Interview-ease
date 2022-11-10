import React from 'react';
import { Question as QuestionType } from '@interfaces/common';
import TextArea from '@components/common/textarea/textarea';
import MarkdownContainer from '@components/common/markdown-container/markdown-container';
import Label from '@components/common/text/label/label';
import useTranslation from '@utils/hooks/use-translation';
import Rating from '@components/common/rating/rating';

type QuestionProps = {
  topicId: string;
  index: number;
  question: QuestionType;
};

const Question: React.FC<QuestionProps> = (props) => {
  const { topicId, index, question } = props;

  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col gap-4"
      data-block-type="question"
    >
      <div className="flex flex-col gap-2">
        <Label>{t('TOPIC.LABELS.QUESTION')}</Label>
        <h3
          className="text-2xl font-semibold dark:text-white"
          data-question={question.question}
        >
          {question.question}
        </h3>
      </div>
      {!!question?.additional?.replaceAll('\n', '') && (
        <div className="flex flex-col gap-2">
          <Label>{t('TOPIC.LABELS.ADDITIONAL_INFORMATION')}</Label>
          <MarkdownContainer>
            <div dangerouslySetInnerHTML={{ __html: question.additional }} />
          </MarkdownContainer>
        </div>
      )}
      {!!question?.expectedAnswer && (
        <div className="flex flex-col gap-2">
          <Label>{t('TOPIC.LABELS.EXPECTED_ANSWER')}</Label>
          <MarkdownContainer>
            <div dangerouslySetInnerHTML={{ __html: question.expectedAnswer }} />
          </MarkdownContainer>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label>{t('TOPIC.LABELS.RATING')}</Label>
        <Rating />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${topicId}-${index}`}>{t('TOPIC.LABELS.NOTES')}</Label>
        <TextArea
          id={`${topicId}-${index}`}
          placeholder="..."
        />
      </div>
    </div>
  );
};

export default Question;
