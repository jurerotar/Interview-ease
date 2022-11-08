import React, { HTMLAttributes } from 'react';

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

export default MarkdownContainer;
