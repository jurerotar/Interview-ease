import React, { useRef } from 'react';
import Input from '@components/common/input/input';
import Label from '@components/common/text/label/label';

type NewQuestionFormProps = {
  submitHandler: Function;
};

const NewQuestionForm: React.FC<NewQuestionFormProps> = (props) => {
  const { submitHandler } = props;

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
        <Label>Question</Label>
        <Input
          placeholder="..."
          ref={questionInputRef}
        />
      </div>
      <button
        className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-green-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-green-600"
        onClick={onSubmit}
        type="button"
      >
        Add new question
      </button>
    </form>
  );
};

export default NewQuestionForm;
