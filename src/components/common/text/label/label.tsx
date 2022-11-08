import React, { HTMLProps } from 'react';

type LabelProps = {
  children: React.ReactNode;
} & HTMLProps<HTMLLabelElement>;

const Label: React.FC<LabelProps> = (props) => {
  const { children } = props;

  return <label className="text-xs font-semibold uppercase dark:text-gray-300">{children}</label>;
};

export default Label;
