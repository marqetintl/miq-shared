import PropTypes from 'prop-types';

import { createContext, lazy, Suspense, useMemo, useRef, useState } from 'react';

import { getClassName, isRequired } from '@miq/utils';
import TextSection from './TextSection';

import './section.scss';
// import { sectionServices } from './utils';

// const MarkdownSection = lazy(()=>import('./MarkdownSection'))
// const ImageSection = lazy(() => import("./ImageSection"));

const getSectionComponent = (type) => {
  switch (type) {
    case 'MD':
      return lazy(() => import('./MarkdownSection'));
    // return MarkdownSection;
    case 'IMG':
      return lazy(() => import('./ImageSection'));
    case 'JUMB':
      return lazy(() => import('./JumbotronSection'));
    case 'CLOSE':
      return lazy(() => import('./CloseTemplateSection'));

    default:
      return TextSection;
  }
};

const SectionCtx = createContext();

export default function Section(props) {
  const { data = isRequired('section data props') } = props;
  const { slug, type } = data;

  const ref = useRef();
  const [isEdit, setEdit] = useState(props.isEdit || false);

  const ctx = useMemo(() => {
    return { isEdit, setEdit };
  }, [isEdit]);

  if (!slug) return null;

  const SectionComponent = getSectionComponent(type);

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <SectionCtx.Provider value={ctx}>
        <SectionComponent
          {...props}
          context={ctx}
          ref={ref}
          className={getClassName(['section', isEdit && 'active'])}
        />
      </SectionCtx.Provider>
    </Suspense>
  );
}

Section.propTypes = {
  data: PropTypes.shape({ type: PropTypes.string.isRequired, slug: PropTypes.string }).isRequired,
  onDataChange: PropTypes.func,
};
