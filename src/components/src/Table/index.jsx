import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import isArray from 'lodash.isarray';

import { getClassName } from '@miq/utils';

import './table.scss';
import { Pagination, paginationPropTypes } from '../Pagination';

const propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  pagination: PropTypes.shape(paginationPropTypes),
};

export const ItemTable = ({ items, renderItem, pagination, ...props }) => {
  if (!isArray(items) || !isFunction(renderItem)) return null;

  return (
    <>
      <Table {...props}>{items.map((item) => renderItem(item))}</Table>
      {pagination && (
        <div className="miq-item-list-pagination">
          <Pagination {...pagination} />
        </div>
      )}
    </>
  );
};

const Header = ({ headers }) => {
  if (!isArray(headers)) return null;

  return (
    <thead className="miq-table-header">
      <tr>
        {headers.map((label) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default function Table({ children, ...props }) {
  const { headers, ...rest } = props;
  return (
    <table {...rest} className={getClassName(['miq-table', props.className])}>
      <Header {...props} {...{ headers }} />
      <tbody>{children}</tbody>
    </table>
  );
}

Table.Tr = ({ children, ...props }) => (
  <tr {...props} className={getClassName(['miq-table-tr', props.className])}>
    {children}
  </tr>
);

Table.Td = ({ children, ...props }) => (
  <td {...props} className={getClassName(['miq-table-td', props.className])}>
    {children}
  </td>
);
