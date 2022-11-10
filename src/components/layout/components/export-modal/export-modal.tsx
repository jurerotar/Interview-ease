import React from 'react';
import { useApplication } from '@providers/application-context';
import useTranslation from '@utils/hooks/use-translation';
import { Tabs } from 'react-tabs';

function ExportModal() {
  const { topics } = useApplication();
  const {} = useTranslation();

  return (
    <div className="flex flex-col gap-4 w-full">
      <Tabs>

      </Tabs>
    </div>
  );
}

export default ExportModal;
