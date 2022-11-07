import React, { HTMLAttributes, HTMLProps, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Question as QuestionType } from '@interfaces/common';

type MarkdownContainerProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const MarkdownContainer: React.FC<MarkdownContainerProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      className="prose flex w-full max-w-full flex-col prose-p:my-2 prose-blockquote:my-1 prose-blockquote:font-normal prose-blockquote:not-italic prose-headings:dark:text-white prose-blockquote:dark:text-white"
      {...rest}
    >
      {children}
    </div>
  );
};

type SubheadingProps = {
  children: React.ReactNode;
} & HTMLProps<HTMLLabelElement>;

const Subheading: React.FC<SubheadingProps> = (props) => {
  const { children } = props;

  return <label className="text-xs font-semibold uppercase dark:text-gray-300">{children}</label>;
};

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

  return (
    <div
      className="flex flex-col gap-4"
      data-block-type="question"
    >
      <div className="flex flex-col gap-2">
        <Subheading>Question</Subheading>
        <h3
          className="text-2xl font-semibold dark:text-white"
          data-question={question.question}
        >
          {question.question}
        </h3>
      </div>
      {!!question?.additional?.replaceAll('\n', '') && (
        <div className="flex flex-col gap-2">
          <Subheading>Additional details</Subheading>
          <MarkdownContainer>
            <div dangerouslySetInnerHTML={{ __html: question.additional }} />
          </MarkdownContainer>
        </div>
      )}
      {!!question?.expectedAnswer && (
        <div className="flex flex-col gap-2">
          <Subheading>Expected answer</Subheading>
          <MarkdownContainer>
            <div dangerouslySetInnerHTML={{ __html: question.expectedAnswer }} />
          </MarkdownContainer>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Subheading>Answer rating</Subheading>
        <Rating />
      </div>
      <div className="flex flex-col gap-2">
        <Subheading htmlFor={`${topicId}-${index}`}>Notes</Subheading>
        <TextareaAutosize
          id={`${topicId}-${index}`}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="..."
        />
      </div>
    </div>
  );
};

export default Question;
