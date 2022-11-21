import React, { useState } from 'react';
import RatingStar from '@components/common/rating/components/star/star';
import RatingDelete from '@components/common/rating/components/delete/delete';

type RatingProps = {
  name?: string;
  value?: number;
  changeHandler?: Function;
  deleteHandler?: Function;
};

const Rating: React.FC<RatingProps> = (props) => {
  const {
    name,
    value = 0,
    changeHandler,
    deleteHandler
  } = props;

  const [selectedRating, setSelectedRating] = useState<number>(value);

  const setRating = (rating: number) => {
    changeHandler?.(rating, name);
    setSelectedRating(rating);
  };

  const deleteRating = () => {
    deleteHandler?.(name);
    setSelectedRating(0);
  };

  return (
    <div
      className="flex w-fit items-center justify-evenly gap-4 min-h-[1.5rem]"
      data-rating={selectedRating}
    >
      <div className="flex items-center justify-evenly gap-1">
        {[1, 2, 3, 4, 5].map((rating: number) => (
          <RatingStar
            value={rating}
            key={rating}
            isSelected={rating <= selectedRating}
            onClick={() => setRating(rating)}
          />
        ))}
      </div>
      {selectedRating > 0 && (
        <RatingDelete onClick={deleteRating} />
      )}
    </div>
  );
};

export default Rating;
