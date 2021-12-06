// import PropTypes from 'prop-types';

import { getClassName, IS_DEV } from '@miq/utils';
import { forwardRef } from 'react';
import { Icons, Img } from '@miq/components';
import Form, { FormProvider, useForm } from '@miq/form';
import { SectionBody } from '../section-ui';

import render from '../section-renderers';
import { sectionRequiredProps, sectionServices } from '../utils';

import './close-section.scss';
import { SectionImgUploadButton } from '../section-components';

/**
 * CLOSE TEMPLATE SECTION
 */

const CloseSectionPreview = (props) => {
  const handleUpload = (sectionData) => {
    if (sectionData.isUpdated) {
      props.onDataChange(sectionData);
      props.context.setEdit(false);
    }
  };

  return (
    <div className="">
      <SectionImgUploadButton
        section={props.data}
        imgSlug={props.data.image ? props.data.image.slug : null}
        onCreate={handleUpload}
        onUpdate={handleUpload}
      >
        <Img {...props.data.image} />
      </SectionImgUploadButton>
    </div>
  );
};

const CloseTemplateSection = forwardRef((props, ref) => {
  const { data = {} } = props;
  const form = useForm({ title: data.title || '', text: data.text || '' });
  const { slug, type } = data;

  const handleSave = ({ name, value }) => {
    if (!slug) return;

    const html = render({ ...data, type, [name]: value });

    return sectionServices.patch(slug, { type, [name]: value, html }).then(({ isUpdated, ...res }) => {
      if (isUpdated) {
        // props.onDataChange(res);
        props.context.setEdit(false);
      }
    });
  };

  return (
    <FormProvider value={form}>
      <div id={props.id} {...{ ref }} className={getClassName([props.className])}>
        <div className="text-bold">Customize your landing.</div>
        {/* <SectionHeader Icon={Icons.TextareaT} /> */}

        <SectionBody>
          <div className="mb-1">
            <Form.TextInput name="title" placeholder="Write title ..." onSave={handleSave} maxLength={50} />
          </div>

          <div className="mb-1">
            <Form.TextArea name="text" placeholder="Write text ..." onSave={handleSave} maxLength={99} />
          </div>

          <CloseSectionPreview {...props} />
        </SectionBody>

        {/* <SectionFooter className="border-0"></SectionFooter> */}
      </div>
    </FormProvider>
  );
});

export default CloseTemplateSection;

CloseTemplateSection.propTypes = {
  ...sectionRequiredProps,
};

if (IS_DEV) {
  CloseTemplateSection.displayName = 'CloseTemplateSection';
}
