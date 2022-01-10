import React, { useEffect, useState } from 'react';
import { isRequired } from '@miq/utils';
import { indexStaffServices, pageStaffServices } from './utils';
import { sectionServices } from '../Section/utils';
import { Section } from '..';

export const SectionsEditor = ({ children, ...props }) => {
  return <div className="miq-page-editor">{children}</div>;
};

const Sections = ({
  sourceSlug = isRequired('source slug'),
  sourceType = isRequired('source type(page/index etc)'),
  ...props
}) => {
  const [sections, setSections] = useState({ results: [] });
  useEffect(() => {
    if (!sourceSlug) return;

    sectionServices.list({ source: sourceSlug, source_type: sourceType }).then((data) => {
      setSections(data);
    });
  }, [sourceSlug, sourceType]);

  const handleSectionChange = (newData) => {
    // console.log(newData);
    setSections({
      ...sections,
      results: sections.results.map((item) => {
        if (item.slug === newData.slug) return newData;
        return item;
      }),
    });
  };

  return (
    <div className="miq-page-editor-sections">
      {sections.results.map((data) => (
        <Section data={data} key={data.slug} onDataChange={handleSectionChange} />
      ))}
    </div>
  );
};

//

SectionsEditor.propTypes = {};
SectionsEditor.Sections = Sections;

//

export { indexStaffServices, pageStaffServices };
