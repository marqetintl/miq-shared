import React, { forwardRef, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { debounce, isFunction } from 'lodash';

import { TextareaX } from '@miq/components';
import { getClassName, isRequired, IS_DEV } from '@miq/utils';
import FormCtx from './FormCtx';

const withInput = (Component, args = {}) => {
  return forwardRef((props, ref) => {
    // props = { ...args, ...props };
    const ctx = useContext(FormCtx) || isRequired('FormCtx');
    const { name = isRequired('name prop') } = props;
    let { value, checked } = props;

    if (Object.keys(ctx.values).includes(name)) {
      if (props.type === 'checkbox') checked = ctx.values[name];
      else value = ctx.values[name];
    }

    let { onSave, error, isValid, ...rest } = props;
    const debounceOnSave = useRef(
      debounce((e) => {
        if (props.required && !e.target.value) return;
        if (!onSave || !isFunction(onSave)) return;
        return onSave({ name: e.target.name, value: e.target.value, e });
      }, 500)
    );

    const onChange = (e) => {
      if (error) {
        ctx.setErrors({ ...ctx.errors, [e.target.name]: null });
      }

      const func = props.onChange || ctx.handleChange;
      if (!func) return;

      func(e);
      if (isFunction(isValid) && !isValid(e.target)) return;

      if (!debounceOnSave.current) return;
      debounceOnSave.current(e);
    };

    return (
      <>
        <Component
          {...rest}
          className={getClassName([error && 'form-invalid', args.className, props.className])}
          {...{ value, checked, onChange }}
          ref={ref}
        />
        {error && <div className="miq-form-error">{error}</div>}
      </>
    );
  });
};

export const TextInput = withInput('input', { className: 'miq-input' });
TextInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export const TextArea = withInput('textarea', { className: 'miq-textarea' });
export const TextAreaX = withInput(TextareaX);

if (IS_DEV) {
  TextInput.displayName = 'TextInput';
  TextArea.displayName = 'TextArea';
  TextAreaX.displayName = 'TextAreaX';
}
