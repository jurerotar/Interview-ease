import React, { HTMLAttributes } from 'react';
import useTranslation from '@utils/hooks/use-translation';
import Button from '@components/common/button/button';

const RatingDelete: React.FC<HTMLAttributes<HTMLButtonElement>> = (props) => {
  const { ...rest } = props;

  const { t } = useTranslation();

  return (
    <Button
      variant="danger"
      className="px-2 py-1 text-xs font-semibold"
      {...rest}
    >
      {t('BUTTONS.CLEAR')}
    </Button>
  );
};

export default RatingDelete;
