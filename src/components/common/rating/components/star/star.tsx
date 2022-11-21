import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type StarProps = {
  value: number;
  isSelected: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const RatingStar: React.FC<StarProps> = (props) => {
  const { isSelected, ...rest } = props;

  return (
    <button
      className={clsx(isSelected ? 'text-yellow-400' : 'text-white')}
      type="button"
      {...rest}
    >
      <FontAwesomeIcon
        className="pointer-events-none"
        icon={faStar}
        width={20}
        height={20}
      />
    </button>
  );
};

export default RatingStar;
