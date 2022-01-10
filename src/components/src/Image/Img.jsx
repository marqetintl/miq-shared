import React from 'react';

import { getClassName, getImgUrl } from '@miq/utils';

import { ImgPlaceholderDiv } from './ImgPlaceholderDiv';

export const Picture = (props) => {
  let { src, src_mobile, isMobile, ...mobile_data } = props;
  const { width_mobile, height_mobile, ...rest } = mobile_data;

  if (!src) return <ImgPlaceholderDiv {...rest} />;

  src = getImgUrl(src);
  src_mobile = getImgUrl(src_mobile);
  const orientation =
    props?.width < props?.height ? 'portrait' : props?.width === props?.height ? 'square' : 'landscape';

  return (
    <picture>
      <source srcSet={src} media={`(min-width: 768px)`} />
      <img
        {...rest}
        src={src_mobile || src}
        alt={props.alt_text || props.title || ''}
        className={getClassName(['miq-img miq-img-picture', orientation, rest.className])}
        title={props.title}
        aria-label={props.aria_label || props.title}
      />
    </picture>
  );
};

export const Img = (props) => {
  let { src, src_mobile, isMobile, ...mobile_data } = props;
  const { width_mobile, height_mobile, ...rest } = mobile_data;

  if (!src) return <ImgPlaceholderDiv {...rest} />;

  src = getImgUrl(src);
  src_mobile = getImgUrl(src_mobile);
  const orientation =
    props?.width < props?.height ? 'portrait' : props?.width === props?.height ? 'square' : 'landscape';

  return (
    <img
      width={isMobile ? width_mobile : props.width}
      height={isMobile ? height_mobile : props.height}
      src={isMobile ? src_mobile : src}
      alt={props.alt_text || props.title || ''}
      title={props.title}
      aria-label={props.ariaLabel || props.title}
      className={getClassName(['miq-img', isMobile && 'miq-img-mobile', orientation, rest.className])}
    />
  );
};
