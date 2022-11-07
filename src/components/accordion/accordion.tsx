import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './accordion.module.scss';

type AccordionProps = {
  summary: React.ReactNode;
  open?: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDetailsElement>;

const Accordion: React.FC<AccordionProps> = (props) => {
  const { summary, open = true, children } = props;

  return (
    <details open={open}>
      <summary className={clsx('cursor-pointer rounded-md bg-[#292D32] p-2 font-semibold text-white transition-colors duration-300')}>
        {summary}
      </summary>
      <div className={clsx('flex flex-col pl-4', styles['dropdown-border'])}>{children}</div>
    </details>
  );
};

export default Accordion;
