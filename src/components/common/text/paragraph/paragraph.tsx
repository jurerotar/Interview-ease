import React, { HTMLProps } from 'react';
import clsx from 'clsx';

type ParagraphProps = {
  children: React.ReactNode;
} & HTMLProps<HTMLParagraphElement>;

const Paragraph: React.FC<ParagraphProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <p
      className={clsx('transition-colors duration-300 dark:text-white', className)}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Paragraph;
