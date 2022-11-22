import React, { HTMLProps } from 'react';

type LabelProps = {
  children: React.ReactNode;
} & HTMLProps<HTMLLabelElement>;

const Label: React.FC<LabelProps> = (props) => {
  const { children } = props;

  // TODO: Fix this component
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label className="text-xs font-semibold uppercase dark:text-gray-300">{children}</label>;
};

export default Label;
