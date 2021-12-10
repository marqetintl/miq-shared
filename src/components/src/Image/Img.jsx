import React from 'react';

import { getClassName, getImgUrl } from '@miq/utils';

import { ImgPlaceholderDiv } from './ImgPlaceholderDiv';

export const Picture = (props) => {
  let { src, src_mobile, isMobile, ...mobile_data } = props;
  const { width_mobile, height_mobile, ...rest } = mobile_data;

  if (!src) return <ImgPlaceholderDiv {...rest} />;

  src = getImgUrl(src);
  src_mobile = getImgUrl(src_mobile);
  const srcSet = getClassName([src_mobile && `${src_mobile} 480w,`, `${src} ${props.width}w`]);

  return (
    <picture>
      <source srcSet={src} media={`(min-width: 768px)`} />
      <img
        src={src_mobile || src}
        alt={props.alt_text || ''}
        className={getClassName(['miq-img miq-img-picture', rest.className])}
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

  return (
    <img
      width={isMobile ? width_mobile : props.width}
      height={isMobile ? height_mobile : props.height}
      src={isMobile ? src_mobile : src}
      alt={props.alt_text || ''}
      className={getClassName(['miq-img', isMobile && 'miq-img-mobile', rest.className])}
    />
  );
};
