import { GetStaticProps, NextPage } from 'next';
import { removePropertyDeep } from '@utils/helpers';
import { Structure } from '@interfaces/common';
import dirTree, { DirectoryTree, DirectoryTreeCallback } from 'directory-tree';
import { createHash } from 'crypto';
import { useApplication } from '@providers/application-context';
import { addQuestionsToStructure } from '@utils/remark';
import Topic from '@components/topic/topic';

type InterviewQuestionsPageProps = {
  structure: Structure[];
};

const callback: DirectoryTreeCallback = (item: DirectoryTree, path: string) => {
  // @ts-ignore
  item.id = createHash('sha1').update(path).digest('base64');
};

const InterviewQuestionsPage: NextPage<InterviewQuestionsPageProps> = () => {
  const { flattenedTopics } = useApplication();

  return (
    <div className="flex w-full flex-col gap-4">
      {flattenedTopics.map((structure: Structure) => (
        <Topic
          key={structure.id}
          topic={structure}
        />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<InterviewQuestionsPageProps> = async () => {
  const basePath = `${process.cwd()}/questions`;
  const { children: structure } = dirTree(basePath, { extensions: /\.md/ }, callback) as unknown as Structure;

  return {
    props: {
      structure: removePropertyDeep(await addQuestionsToStructure(structure), 'path')
    }
  };
};

export default InterviewQuestionsPage;
