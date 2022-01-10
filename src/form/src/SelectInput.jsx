import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { isRequired, IS_DEV, getClassName } from '@miq/utils';
import FormCtx from './FormCtx';

const optionPropTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const Option = ({ label, children, ...props }) => (
  <option {...props} value={props.value}>
    {children || label}
  </option>
);

Option.propTypes = optionPropTypes;

const SelectInput = forwardRef(({ children, ...props }, ref) => {
  const ctx = useContext(FormCtx) || isRequired('FormCtx');
  const { name = isRequired('name prop'), nullValue } = props;

  if (Object.keys(ctx.values).includes(name)) {
    // props["checked"] = ;
  }

  return (
    <select
      name={name}
      value={props.value || ctx?.values?.[name]}
      onChange={props.onChange || ctx.handleChange}
      error={ctx?.errors?.[name]}
      id={props.id}
      className={getClassName(['miq-select', props.className])}
      ref={ref}
    >
      {nullValue?.label && <Option {...nullValue} value={nullValue?.value || ''} />}
      {children}
    </select>
  );
});

SelectInput.Option = Option;

SelectInput.defaultProps = {
  id: '',
  className: '',
};

SelectInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nullValue: PropTypes.shape(optionPropTypes),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func,
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SelectInput;

if (IS_DEV) {
  SelectInput.displayName = 'SelectInput';
}
