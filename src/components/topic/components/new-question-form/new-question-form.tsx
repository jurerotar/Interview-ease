import React, { useRef } from 'react';
import Input from '@components/common/input/input';
import Label from '@components/common/text/label/label';
import Button from '@components/common/button/button';
import useTranslation from '@utils/hooks/use-translation';

type NewQuestionFormProps = {
  submitHandler: Function;
};

const NewQuestionForm: React.FC<NewQuestionFormProps> = (props) => {
  const { submitHandler } = props;

  const { t } = useTranslation();

  const questionInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = () => {
    const questionRef = questionInputRef.current;
    if (!questionRef || questionRef?.value?.length <= 0) {
      return;
    }
    submitHandler({
      question: questionRef!.value
    });
    questionRef.value = '';
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>{t('TOPIC.LABELS.QUESTION')}</Label>
        <Input
          placeholder="..."
          ref={questionInputRef}
        />
      </div>
      <Button
        onClick={onSubmit}
        className="w-fit"
      >
        {t('TOPIC.ADD_NEW_QUESTION.BUTTON')}
      </Button>
    </form>
  );
};

export default NewQuestionForm;
