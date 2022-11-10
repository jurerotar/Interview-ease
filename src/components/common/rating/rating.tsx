import React, { useState } from 'react';
import RatingStar from '@components/common/rating/components/star/star';

type RatingProps = {
  changeHandler?: Function;
};

const Rating: React.FC<RatingProps> = (props) => {
  const { changeHandler } = props;
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const onClick = (rating: number) => {
    changeHandler?.(rating);
    setSelectedRating(rating);
  };

  return (
    <div
      className="flex w-fit items-center justify-evenly gap-1"
      data-rating={selectedRating}
    >
      {[1, 2, 3, 4, 5].map((rating: number) => (
        <RatingStar
          key={rating}
          isSelected={rating <= selectedRating}
          onClick={() => onClick(rating)}
        />
      ))}
    </div>
  );
};

export default Rating;
