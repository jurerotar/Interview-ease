import React from 'react';
import clsx from 'clsx';

type DividerProps = {
  color?: string;
  height?: number;
};

const Divider: React.FC<DividerProps> = (props) => {
  const { color = '', height = 1 } = props;

  return (
    <div
      className={clsx('h-[1px] w-full dark:bg-gray-600', color || '')}
      style={{
        height: `${height}px`,
      }}
    />
  );
};

export default Divider;
