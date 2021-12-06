import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';

import { getClassName } from '@miq/utils';

import './search-text-input.scss';

import { Search as SearchIcon } from '../icons';

const propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
};

export const SearchTextInput = (props) => {
  const { id, className, initialValue = '', onChange, ...rest } = props;

  const [q, setQ] = useState(initialValue);

  const handleChange = (e) => {
    const { value } = e.target;
    setQ(value);

    if (isFunction(onChange)) onChange({ e });

    // if (!value || value.length < 3) {
    //   query.delete('q');
    // } else {
    //   query.set('q', e.target.value);
    // }

    // if (!push.current) return;

    // const path = new URL(window.location.href);
    // push.current(`${path.pathname}?${query}`);
  };

  return (
    <div id={id} className={getClassName(['miq-search-input', className])}>
      <div className="icon-wrapper">
        <SearchIcon className="icon" />
      </div>
      <input
        placeholder="Chercher un document par titre, reference ou description"
        {...rest}
        type="text"
        name="q"
        value={q || ''}
        className="miq-input"
        onChange={handleChange}
      />
    </div>
  );
};

SearchTextInput.propTypes = propTypes;
SearchTextInput.defaultValues = {
  initialValue: '',
};
