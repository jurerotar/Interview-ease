import { GetStaticProps, NextPage } from 'next';
import { Topic as TopicType } from '@interfaces/common';
import { attachQuestionsToTopics, getTopics } from '@utils/remark';
import Topic from '@components/topic/topic';

type InterviewQuestionsPageProps = {
  topics: TopicType[];
};

const InterviewQuestionsPage: NextPage<InterviewQuestionsPageProps> = (props) => {
  const { topics } = props;

  return (
    <div className="flex w-full flex-col gap-4">
      {topics.map((topic: TopicType) => (
        <Topic
          key={topic.id}
          topic={topic}
        />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<InterviewQuestionsPageProps> = async () => {
  return {
    props: {
      topics: await attachQuestionsToTopics(getTopics()),
    }
  };
};

export default InterviewQuestionsPage;
