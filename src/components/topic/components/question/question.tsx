import React, { HTMLAttributes, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Question as QuestionType } from '@interfaces/common';
import TextArea from '@components/common/textarea/textarea';
import MarkdownContainer from '@components/common/markdown-container/markdown-container';
import Label from '@components/common/text/label/label';
import useTranslation from '@utils/hooks/use-translation';

type StarProps = {
  isSelected: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const Star: React.FC<StarProps> = (props) => {
  const { isSelected, ...rest } = props;

  return (
    <button
      className={clsx(isSelected ? 'text-yellow-400' : 'text-white')}
      type="button"
      {...rest}
    >
      <FontAwesomeIcon
        icon={faStar}
        width={20}
        height={20}
      />
    </button>
  );
};

function Rating() {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  return (
    <div
      className="flex w-fit items-center justify-evenly gap-1"
      data-rating={selectedRating}
    >
      {[1, 2, 3, 4, 5].map((rating: number) => (
        <Star
          key={rating}
          isSelected={rating <= selectedRating}
          onClick={() => setSelectedRating(rating)}
        />
      ))}
    </div>
  );
}

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
