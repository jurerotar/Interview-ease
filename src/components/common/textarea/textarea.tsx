import React, { HTMLAttributes } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

const TextArea: React.FC<TextareaAutosizeProps & HTMLAttributes<HTMLTextAreaElement>> = (props) => {
  return (
    <TextareaAutosize
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      {...props}
    />
  );
};

export default TextArea;
