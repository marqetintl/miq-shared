import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { getClassName } from '@miq/utils';
import { Portal } from './Modal';

import './buttons.scss';
import { isFunction } from 'lodash';

const propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

/**
 *
 */
export const Button = forwardRef(({ children, ...props }, ref) => {
  const { type = 'button' } = props;
  return (
    <button {...props} {...{ type }} className={getClassName(['btn', props.className])} ref={ref}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
Button.propTypes = propTypes;

const IBPropTypes = {
  ...propTypes,
  label: PropTypes.string,
  maxSize: PropTypes.number,
  // Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const IconButton = ({ Icon, label, ...props }) => {
  if (!Icon) return null;

  const { maxSize, labelFirst, primary, secondary, ...rest } = props;

  return (
    <button
      title={props.label}
      aria-label={props.title || props.label}
      type="button"
      {...rest}
      className={getClassName([
        'btn',
        label ? 'btn-icon-label' : 'btn-icon',
        primary ? 'btn-primary' : secondary && 'btn-secondary',
        props.className,
      ])}
    >
      <Icon className="icon" height={maxSize} width={maxSize} />
      {label && <span className="label">{label}</span>}
    </button>
  );
};
IconButton.propTypes = IBPropTypes;

/**
 *
 * @param {*} param0
 * @returns
 */
export const IconNavLink = ({ Icon, label, children, ...props }) => {
  // if (!Icon || !props.to) return null;
  const { maxSize, labelFirst, primary, secondary, ...rest } = props;

  return (
    <NavLink
      {...rest}
      className={getClassName([
        'btn',
        label ? 'btn-icon-label' : 'btn-icon',
        primary ? 'btn-primary' : secondary && 'btn-secondary',
        props.className,
      ])}
    >
      {children}
      {Icon && <Icon className="icon" />}
      {label && <span className="label">{label}</span>}
    </NavLink>
  );
};
IconNavLink.propTypes = IBPropTypes;

export const ConfirmIconButton = ({ render, onCancel, onSuccess, ...props }) => {
  const [isOpen, setOpen] = useState(false);

  const { children, renderHeader, renderFooter, fullscreen, modalId, modalClassName, ...button } = props;

  if (!isFunction(render)) return null;

  const ButtonComponent = props.Icon ? IconButton : Button;

  return (
    <div className="">
      <ButtonComponent {...button} onClick={() => setOpen(!isOpen)}>
        {!props.Icon && children}
      </ButtonComponent>

      <Portal>
        {isOpen && (
          <Portal.Modal
            id={modalId}
            className={modalClassName}
            fullscreen={fullscreen}
            header={isFunction(renderHeader) && renderHeader({ isOpen, setOpen })}
            footer={isFunction(renderFooter) && renderFooter({ isOpen, setOpen })}
          >
            {render({ isOpen, setOpen })}
          </Portal.Modal>
        )}
      </Portal>
    </div>
  );
};
