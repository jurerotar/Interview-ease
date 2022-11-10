import { ParsedQuestion, ParsedTopic } from '@interfaces/common';

export const removeExtensionFromName = (name: string): string => {
  return name.substring(0, name.lastIndexOf('.'));
};

export const download = (filename: string, content: string): void => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const parseDataFromDOM = (): ParsedTopic[] => {
  const topicBlocks = document.querySelectorAll('[data-block-type="topic"]');

  return Array.from(topicBlocks)
    .map((topicBlock: Element) => {
      const questionBlocks = topicBlock.querySelectorAll('[data-block-type="question"]');
      const title = topicBlock.querySelector('h2')?.innerHTML;
      const questions = Array.from(questionBlocks)
        .map((questionBlock: Element) => {
          const question = questionBlock.querySelector('[data-question]')!.getAttribute('data-question');
          const rating = parseInt(questionBlock.querySelector('[data-rating]')!.getAttribute('data-rating') ?? '0', 10);
          const notes = questionBlock.querySelector('textarea')!.value;
          return {
            question,
            rating,
            notes
          };
        })
        .filter((data) => data.rating !== 0 || data.notes.length !== 0) as ParsedQuestion[];

      return {
        title,
        questions
      };
    })
    .filter((topic) => topic.questions.length > 0) as ParsedTopic[];
};

// This is what you get when you program at 2 AM :D. Works tho
export const stringifyParsedData = (data: ParsedTopic[]): string => {
  return `${data
    .map((topic: ParsedTopic) => {
      return `${topic.title}\n${topic.questions
        .map((question: ParsedQuestion) => {
          let string = ` - ${question.question}\n`;
          if (question?.rating && question.rating > 0) {
            string = `${string}   Answer rating: ${question.rating}/5 \n`;
          }
          if (question?.notes) {
            string = `${string}   Notes: "${question.notes}" \n`;
          }
          return `${string}\n`;
        })
        .join('')}`;
    })
    .join('')}\n\n`;
};
