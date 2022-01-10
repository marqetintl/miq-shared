import { forwardRef, useState } from 'react';

import { Img, Icons } from '@miq/components';
import { getClassName, IS_DEV } from '@miq/utils';
import Form, { useForm } from '@miq/form';

import './imgs-section.scss';

import { SectionDeleteButton, SectionEditForm, SectionImgUploadButton } from '../section-components';
import { SectionBody, SectionFooter, SectionHeader } from '../section-ui';

import { sectionRequiredProps } from '../utils';
import { SectionImageUpdateForm } from '../ImageSection';

const ImagesSection = forwardRef((props, ref) => {
  const { className, id, ...rest } = props;
  const { images_data = [] } = rest.data;

  return (
    <div id={id} ref={ref} className={getClassName([className, 'section-imgs'])}>
      <SectionHeader Icon={Icons.Image}>
        <div className="d-flex">
          <SectionDeleteButton {...rest} className="me-2" />
          <SectionImgUploadButton section={props.data} onCreate={props.onDataChange} onUpdate={props.onDataChange} />
        </div>
      </SectionHeader>

      <SectionBody>
        {images_data.length > 0 ? (
          <div className="d-grid grid-2 grid-lg-3 flex-1 p-1" style={{ gap: 6 }}>
            {images_data.map((image) => {
              return (
                <div className="" key={image.slug}>
                  <SectionImageUpdateForm image={image} section={props.data} onDataChange={props.onDataChange} />
                </div>
                // <SectionImgUploadButton
                //   section={props.data}
                //   imgSlug={image ? image.slug : null}
                //   onCreate={props.onDataChange}
                //   onUpdate={props.onDataChange}
                // >
                //   <Img {...image} Icon={Icons.CloudArrowUp} />
                // </SectionImgUploadButton>
              );
            })}
          </div>
        ) : (
          <div>Upload images.</div>
        )}
      </SectionBody>

      <SectionFooter></SectionFooter>
    </div>
  );
});

ImagesSection.propTypes = {
  ...sectionRequiredProps,
};

export default ImagesSection;

if (IS_DEV) {
  ImagesSection.displayName = 'ImagesSection';
}
