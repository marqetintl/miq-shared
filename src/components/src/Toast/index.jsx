import { createContext } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash.isarray';

import { isRequired, getClassName } from '@miq/utils';
import { Portal } from '../Modal';

import './toast.scss';
import { ToastItem } from './ToastItem';

export const ToastCtx = createContext();

const { Provider } = ToastCtx;

const propTypes = {
  context: PropTypes.object.isRequired,
  autoClose: PropTypes.bool,
  timeOut: PropTypes.number,
};

export const ToastProvider = ({ children, context = isRequired('Toast context'), position }) => {
  return (
    <Provider value={context}>
      {children}

      <ToastPortal ctx={context} position={position} />
    </Provider>
  );
};

ToastProvider.propTypes = propTypes;

const ToastPortal = ({ ctx, position = 'top-right' }) => {
  const { items } = ctx;
  if (!(isArray(items) && Boolean(items.length))) return null;

  return (
    <Portal>
      <div className={getClassName(['miq-toast-items', position])}>
        {items.map((item) => (
          <ToastItem {...item} ctx={ctx} key={item.id} />
        ))}
      </div>
    </Portal>
  );
};

ToastPortal.propTypes = {
  ctx: PropTypes.shape({
    items: PropTypes.array.isRequired,
  }).isRequired,
  position: PropTypes.oneOf(['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right']),
};
