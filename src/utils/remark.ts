import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkPrism from 'remark-prism';
import remarkHtml from 'remark-html';
import { readFile } from 'fs/promises';
import jsdom from 'jsdom';
import { Question, Topic } from '@interfaces/common';
import dirTree from 'directory-tree';
import { createHash } from 'crypto';

const { JSDOM } = jsdom;

export const transformMarkdownToHTML = async (src: string) => {
  const markdown = await readFile(src, {
    encoding: 'utf-8'
  });

  return unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkPrism)
    .use(remarkHtml, {
      sanitize: false
    })
    .process(markdown);
};

export const splitTopicNodesIntoQuestions = (html: string): Question[] => {
  const dom = new JSDOM(html);
  return Array.from(dom.window.document.querySelectorAll('li')).map((item: HTMLLIElement) => {
    const question = item.querySelector('h3');
    const expectedAnswer = item.querySelector('h3 + blockquote');

    if (question) {
      item.removeChild(question);
    }
    if (expectedAnswer) {
      item.removeChild(expectedAnswer);
    }

    return {
      question: question?.innerHTML ?? null,
      expectedAnswer: expectedAnswer?.outerHTML ?? null,
      additional: item.innerHTML
    };
  });
};

const parseGroupingStructureFromPath = (path: string): Topic['groupingStructure'] => {
  const [name] = path.split('\\').reverse();
  let [, group, grouping] = path.split('\\').reverse();
  // In case we have a (grouping) and no group
  if (group.startsWith('(')) {
    [group, grouping] = [grouping, group];
  }

  return {
    name,
    group: group ?? null,
    grouping: grouping ?? null
  };
};

export const attachQuestionsToTopics = async (topics: Topic[]): Promise<Topic[]> => {
  const resolvedPromises = await Promise.all(topics.map((topic: Topic) => transformMarkdownToHTML(topic.path!)));
  return topics.map((topic: Topic, index: number) => {
    const {
      path,
      ...rest
    } = topic;

    rest.questions = splitTopicNodesIntoQuestions(resolvedPromises[index].value as string);
    return rest;
  });
};

export const getTopics = (): Topic[] => {
  const basePath = `${process.cwd()}\\questions\\`;
  const topics: Topic[] = [];

  dirTree(basePath, { extensions: /\.md/ }, (item) => {
    const topic: Topic = {
      ...item,
      groupingStructure: parseGroupingStructureFromPath(item.path.replace(basePath, '')),
      id: createHash('sha1').update(item.path).digest('base64'),
    };

    topics.push(topic);
  });
  return topics;
};
