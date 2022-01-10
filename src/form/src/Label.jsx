import React from 'react';
import PropTypes from 'prop-types';

import { getClassName } from '@miq/utils';

const propTypes = {
  value: PropTypes.string,
  // children

  id: PropTypes.string,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default function Label({ value, children, ...props }) {
  const shared = {
    id: props.id,
    htmlFor: props.htmlFor,
    className: getClassName(['miq-label', props.className]),
  };

  if (children) {
    return (
      <div {...props} {...shared}>
        {children}
      </div>
    );
  }

  if (!value) return null;

  return <label {...shared}>{value}</label>;
}

Label.propTypes = propTypes;
