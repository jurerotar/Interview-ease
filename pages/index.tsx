import { GetStaticProps, NextPage } from 'next';
import { Topic as TopicType } from '@interfaces/common';
import { attachQuestionsToTopics, getTopics } from '@utils/remark';
import Topic from '@components/topic/topic';
import React from 'react';
import { ApplicationProvider } from '@providers/application-context';
import { PreferencesProvider } from '@providers/preferences-context';
import Layout from '@components/layout/layout';

type InterviewQuestionsPageProps = {
  topics: TopicType[];
};

const InterviewQuestionsPage: NextPage<InterviewQuestionsPageProps> = (props) => {
  const { topics } = props;

  return (
    <ApplicationProvider topics={topics}>
      <PreferencesProvider colorScheme="dark">
        <Layout>
          <div className="flex w-full flex-col gap-4">
            {topics.map((topic: TopicType) => (
              <Topic
                key={topic.id}
                topic={topic}
              />
            ))}
          </div>
        </Layout>
      </PreferencesProvider>
    </ApplicationProvider>
  );
};

export const getStaticProps: GetStaticProps<InterviewQuestionsPageProps> = async () => {
  const topics: TopicType[] = await attachQuestionsToTopics(getTopics());
  return {
    props: {
      topics
    }
  };
};

export default InterviewQuestionsPage;
