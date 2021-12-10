import { forwardRef, createRef } from 'react';
import PropTypes from 'prop-types';

import { services, isRequired, getClassName } from '@miq/utils';

import { FileInput } from '../File';
import { Button } from '../buttons';

const propTypes = {
  slug: PropTypes.string,
  multiple: PropTypes.bool,

  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onError: PropTypes.func,

  children: PropTypes.any,
};

const postImage = (file = isRequired('File'), alt_text = '') => {
  if (file.name.length > 499) {
    return Promise.reject('Filename too long');
  }

  const fd = new FormData();
  fd.append('src', file, file.name);
  fd.append('alt_text', alt_text);

  return services().post(`/api/v1/images/`, fd, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

const patchImage = (imgSlug, file = isRequired('File'), alt_text = '', isMobile = false) => {
  if (file.name.length > 499) {
    return Promise.reject('Filename too long');
  }

  const fd = new FormData();
  fd.append(isMobile ? 'src_mobile' : 'src', file, file.name);
  fd.append('alt_text', alt_text);

  return services().patch(`/api/v1/images/${imgSlug}/`, fd, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const ImgUploadButton = forwardRef(({ children, ...props }, ref) => {
  let uploadRef = createRef();

  const { slug, onCreate, onUpdate, onError, alt_text = '', isMobile, multiple, accept = 'image/*', ...rest } = props;

  const uploadFile = (e) => {
    const func = slug ? patchImage : postImage;
    const callback = slug ? onUpdate : onCreate;
    const file = Array.from(e.target.files)[0];

    let args = slug ? [slug, file, alt_text] : [file, alt_text];
    if (slug && isMobile) args.push(isMobile);

    return func(...args)
      .then((data) => {
        if (callback) return callback(data);
      })
      .catch((err) => {
        // console.log(err);
        if (onError) return onError(err);
      });
  };

  function uploadFiles(e) {
    const func = slug ? patchImage : postImage;
    const callback = slug ? onUpdate : onCreate;
    const promises = [];

    const files = Array.from(e.target.files).splice(0, 10);
    files.forEach((file, i) => {
      const args = slug ? [slug, file, alt_text] : [file, alt_text];
      promises.push(func(...args).catch((err) => {}));
    });

    Promise.all(promises).then((images) => {
      if (callback) return callback(images);
    });
  }

  return (
    <>
      <Button
        {...rest}
        id={props.id}
        className={getClassName(['miq-img-upload-btn', props.className])}
        onClick={() => uploadRef.click()}
        ref={ref}
      >
        {children || `Upload Image${multiple ? 's' : ''}`}
      </Button>
      <FileInput
        accept={accept}
        multiple={multiple}
        onChange={multiple ? uploadFiles : uploadFile}
        ref={(file) => (uploadRef = file)}
      />
    </>
  );
});

ImgUploadButton.propTypes = propTypes;
