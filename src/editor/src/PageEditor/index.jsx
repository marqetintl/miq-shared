import React, { useEffect, useState } from 'react';
import { isRequired } from '@miq/utils';
import { indexStaffServices, pageStaffServices } from './utils';
import { sectionServices } from '../Section/utils';
import { Section } from '..';

export const PageEditor = ({ children, ...props }) => {
  return <div className="miq-page-editor">{children}</div>;
};

export const PageEditorSections = ({
  pageSlug = isRequired('page slug'),
  sourceType = isRequired('page type(page/index)'),
  ...props
}) => {
  const [sections, setSections] = useState({ results: [] });
  useEffect(() => {
    if (!pageSlug) return;

    sectionServices.list({ source: pageSlug, source_type: sourceType }).then((data) => {
      setSections(data);
    });
  }, [pageSlug, sourceType]);

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

PageEditor.propTypes = {};
PageEditor.Sections = PageEditorSections;

//

export { indexStaffServices, pageStaffServices };
