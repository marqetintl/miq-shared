import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import isArray from 'lodash.isarray';

import { getClassName } from '@miq/utils';

import { Pagination, paginationPropTypes } from './Pagination';

const propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  pagination: PropTypes.shape(paginationPropTypes),
};

export const ItemList = ({ items, renderItem, pagination, ...props }) => {
  if (!isArray(items) || !isFunction(renderItem)) return null;

  return (
    <div {...props} className={getClassName(['miq-item-list', props.className])}>
      {items.map((item) => renderItem(item))}

      {pagination && (
        <div className="miq-item-list-pagination">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
};

ItemList.propTypes = propTypes;
