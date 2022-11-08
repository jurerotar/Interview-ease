import { VFile } from 'vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkPrism from 'remark-prism';
import remarkHtml from 'remark-html';
import { readFile } from 'fs/promises';
import jsdom from 'jsdom';
import { Question, Structure } from '@interfaces/common';

const { JSDOM } = jsdom;

export const transformMarkdownToHTML = async (src: string): Promise<VFile> => {
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

export const addQuestionsToStructure = async (structureArray: Structure[]): Promise<Structure[]> => {
  const children: Structure[] = [];
  const promises: Promise<VFile>[] = [];

  const traverse = async (array: Structure[]) => {
    array.forEach((structure: Structure) => {
      if (structure.hasOwnProperty('children')) {
        traverse(structure.children);
      }
      if (structure.path.endsWith('.md')) {
        children.push(structure);
        promises.push(transformMarkdownToHTML(structure.path));
      }
    });
  };

  await traverse(structureArray);

  const resolvedPromises = await Promise.all(promises);

  resolvedPromises.forEach((vFile: Awaited<VFile>, index) => {
    children[index].questions = splitTopicNodesIntoQuestions(vFile.value as string);
  });

  return structureArray;
};
