import React from 'react';
import Accordion from '@components/accordion/accordion';
import { Structure } from '@interfaces/common';
import { useApplication } from '@providers/application-context';
import { removeExtensionFromName } from '@utils/helpers';

type SectionProps = {
  index: number;
  section: Structure;
};

const Section: React.FC<SectionProps> = (props) => {
  const { index, section } = props;

  const { setSelectedTopic } = useApplication();

  const isGrouped: boolean = section.name.startsWith('(');

  return (
    <div className="flex flex-col gap-2">
      {isGrouped && (
        <>
          <span className="text-xs font-bold uppercase text-gray-400">{section.name.slice(1, -1)}</span>
          {/* eslint-disable-next-line no-use-before-define */}
          <Sections sections={section?.children ?? []} />
        </>
      )}
      {!isGrouped && (
        <Accordion
          summary={section.name}
          open={index === 0}
        >
          {section?.children?.map((topic: Omit<Structure, 'children'>) => (
            <div
              key={topic.name}
              className="py-2"
            >
              <button
                onClick={() => setSelectedTopic(topic.id)}
                type="button"
                className="p-1 text-sm font-bold uppercase transition-colors duration-300 dark:text-gray-300 hover:dark:text-white"
              >
                {removeExtensionFromName(topic.name)}
              </button>
            </div>
          ))}
        </Accordion>
      )}
    </div>
  );
};

type SectionsProps = {
  sections: Structure[];
};

const Sections: React.FC<SectionsProps> = (props) => {
  const { sections } = props;

  return (
    <>
      {sections.map((section: Structure, index: number) => (
        <Section
          index={index}
          key={section.name}
          section={section}
        />
      ))}
    </>
  );
};

function Navigation() {
  const { structure } = useApplication();

  return <Sections sections={structure} />;
}

export default Navigation;
