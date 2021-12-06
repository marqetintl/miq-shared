import PropTypes from 'prop-types';

import { getClassName, IS_DEV } from '@miq/utils';
import { forwardRef } from 'react';
import { Icons, Img, Button } from '@miq/components';
import Form, { FormProvider, useForm } from '@miq/form';
import { SectionDeleteButton, SectionEditButton, SectionEditForm, SectionImgUploadButton } from '../section-components';
import { SectionBody, SectionFooter, SectionHeader } from '../section-ui';

import './jumb-section.scss';
import render from '../section-renderers';
import { sectionRequiredProps, sectionServices } from '../utils';

/**
 * JUMBOTRON SECTION
 */

const JumbotronEditForm = ({ data = isRequired('section data'), ...props }) => {
  const form = useForm({ title: data.title || '', text: data.text || '' });

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    const html = render({ ...data, ...form.values });
    return sectionServices.patch(data.slug, { ...form.values, html }, data).then((res) => {
      if (props.onDataChange) props.onDataChange(res);
    });
  };

  return (
    <SectionEditForm form={form}>
      <div className="d-flex">
        <div className="me-1">
          <SectionImgUploadButton
            section={data}
            imgSlug={data.image ? data.image.slug : null}
            onCreate={props.onDataChange}
            onUpdate={props.onDataChange}
          >
            <Img {...data.image} />
          </SectionImgUploadButton>
        </div>
        <div className="flex-1">
          <div className="mb-1">
            <SectionEditForm.TitleInput />
          </div>
          <div className="mb-1">
            <SectionEditForm.TextInput />
          </div>

          <div className="">
            <Button className="btn-primary-2" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </SectionEditForm>
  );
};

const JumbotronSection = forwardRef((props, ref) => {
  const { data, onDataChange } = props;

  return (
    <div id={props.id} {...{ ref }} className={getClassName([props.className])}>
      <SectionHeader Icon={Icons.TextareaT}></SectionHeader>

      <SectionBody>
        {props.context.isEdit ? (
          <JumbotronEditForm {...props} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: props.data.html || 'Nothing to preview' }} />
        )}
      </SectionBody>

      <SectionFooter>
        <div className="actions">
          <SectionDeleteButton context={props.context} data={props.data} label="Delete" />

          <SectionEditButton context={props.context} data={props.data} />
        </div>
      </SectionFooter>
    </div>
  );
});

export default JumbotronSection;

JumbotronSection.propTypes = {
  ...sectionRequiredProps,
};

if (IS_DEV) {
  JumbotronSection.displayName = 'JumbotronSection';
}
