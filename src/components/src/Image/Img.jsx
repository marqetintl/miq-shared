import React from 'react';

import { getClassName, getImgUrl } from '@miq/utils';

import { ImgPlaceholderDiv } from './ImgPlaceholderDiv';

export const Img = (props) => {
  let { src, ...rest } = props;

  if (!src) return <ImgPlaceholderDiv {...rest} />;

  return (
    <img
      {...rest}
      src={getImgUrl(src)}
      alt={props.alt_text || ''}
      className={getClassName(['miq-img', rest.className])}
    />
  );
};

// <picture style={{ display: 'none' }}>
//   <source
//     data-srcset=" //cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_180x.jpg?v=1638393295 180w 266h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_360x.jpg?v=1638393295 360w 533h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_540x.jpg?v=1638393295 540w 799h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_720x.jpg?v=1638393295 720w 1065h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_900x.jpg?v=1638393295 900w 1331h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1080x.jpg?v=1638393295 1080w 1598h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1296x.jpg?v=1638393295 1296w 1917h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1512x.jpg?v=1638393295 1512w 2237h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1569x.jpg?v=1638393295 1569w 2321h"
//     sizes="428px"
//     srcSet=" //cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_180x.jpg?v=1638393295 180w 266h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_360x.jpg?v=1638393295 360w 533h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_540x.jpg?v=1638393295 540w 799h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_720x.jpg?v=1638393295 720w 1065h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_900x.jpg?v=1638393295 900w 1331h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1080x.jpg?v=1638393295 1080w 1598h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1296x.jpg?v=1638393295 1296w 1917h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1512x.jpg?v=1638393295 1512w 2237h,//cdn.shopify.com/s/files/1/0271/4967/files/12_211020_FLL_NYC_070_V1_1569x.jpg?v=1638393295 1569w 2321h"
//   />
//   <img alt="" className="lazyautosizes lazyloaded" data-sizes="auto" data-parent-fit="cover" sizes="428px" />
// </picture>
