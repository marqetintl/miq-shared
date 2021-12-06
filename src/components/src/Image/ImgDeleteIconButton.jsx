import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { services, getClassName } from '@miq/utils';

import { Trash } from '../icons';
import { IconButton } from '../buttons';

const propTypes = {
  slug: PropTypes.string,

  onSuccess: PropTypes.func,
  onError: PropTypes.func,

  children: PropTypes.any,
};

export const ImgDeleteIconButton = forwardRef(({ children, ...props }, ref) => {
  const { slug, onSuccess, onError, ...rest } = props;
  if (!slug) return null;

  const handleDelete = (e) => {
    return services()
      .delete(`/api/v1/images/${slug}/`)
      .then((data) => {
        if (onSuccess) return onSuccess(data);
      })
      .catch((err) => {
        if (onError) return onError(err);
      });
  };

  return (
    <IconButton
      Icon={Trash}
      label="Delete Image"
      {...rest}
      className={getClassName(['miq-img-delete-btn', props.className])}
      onClick={handleDelete}
      ref={ref}
    />
  );
});

ImgDeleteIconButton.propTypes = propTypes;
