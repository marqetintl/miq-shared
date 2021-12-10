import PropTypes from 'prop-types';

import { IconButton, Icons, Img, ImgUploadButton } from '@miq/components';

import { isRequired } from '@miq/utils';
import { sectionRequiredProps, sectionServices } from './utils';
import render from './section-renderers';
import Form, { FormProvider } from '@miq/form';

export const SectionAddButton = (props) => {
  const { sourceSlug = isRequired('section source slug'), type = isRequired('section type') } = props;

  const handleCreate = () => {
    // pagesActions.postSection(sourceSlug, { type });
  };

  return <button onClick={handleCreate}>Add {type}</button>;
};

export const SectionSaveButton = (props) => {
  const { form = isRequired('form context') } = props;
  const { data = isRequired('section data') } = props;
  const { context = isRequired('section context') } = props;

  const handleSave = (e) => {
    const shouldSave = data.text !== form.values.text;
    // console.log('Saving', shouldSave);

    if (!shouldSave) return context.setEdit(!context.isEdit);
    if (!props.onSave) return;

    props.onSave();
  };

  return (
    <IconButton Icon={Icons.ArrowUpCircle} label="Save" className="section-btn" title="Save" onClick={handleSave} />
  );
};

SectionSaveButton.propTypes = {
  ...sectionRequiredProps,
  form: PropTypes.any.isRequired,
};

export const SectionDeleteButton = (props) => {
  const { context = isRequired('section context') } = props;
  const { data = isRequired('section data') } = props;

  return (
    <IconButton
      {...props}
      Icon={Icons.Trash}
      className="section-btn btn-danger"
      title="Delete"
      onClick={() => context.remove(data.slug)}
    />
  );
};

export const SectionEditButton = (props) => {
  const { context = isRequired('section context') } = props;
  const { isEdit } = context;

  return (
    <IconButton
      Icon={isEdit ? Icons.Eye : Icons.PencilSquare}
      className="section-btn"
      title={isEdit ? 'Preview Mode' : 'Edit Mode'}
      onClick={() => context.setEdit(!isEdit)}
    />
  );
};

SectionEditButton.propTypes = {
  ...sectionRequiredProps,
};

export const SectionImgUploadButton = ({ imgSlug, section = isRequired('Section data'), ...props }) => {
  if (!section.slug) return null;

  const { type } = section;
  const { onCreate, onUpdate, ...rest } = props;

  const handleUpload = ({ isUpdated, ...imgData }) => {
    const { slug } = imgData;

    // TODO
    let images = section.images;
    if (!images.includes(slug)) {
      images.push(slug);
      // section.images_data.push(imgData);
    }

    const html = render({ ...section, image: imgData, images });

    return sectionServices
      .patch(section.slug, { type, images, html }, { type, images: section.images, html: section.html })
      .then((sectionData) => {
        if (sectionData.isUpdated) {
          if (imgSlug && onUpdate) return onUpdate(sectionData);

          onCreate && onCreate(sectionData);
        }
      });
  };

  return <ImgUploadButton {...rest} onCreate={handleUpload} onUpdate={handleUpload} slug={imgSlug} />;
};

SectionImgUploadButton.propTypes = {
  // section: PropTypes.shape({ ...sectionRequiredProps }).isRequired,
  imgSlug: PropTypes.string,
};

/**
 * FORM BUTTONS
 */

/**
 * FORM INPUTS
 */

export const SectionTitleInput = (props) => {
  return <Form.TextInput placeholder="Write title..." {...props} name="title" />;
};

export const SectionTextInput = (props) => {
  return <Form.TextInput placeholder="Write text..." {...props} name="text" />;
};

/**
 * FORM
 */

export const SectionEditForm = ({ form = isRequired('form'), children, ...props }) => {
  return <FormProvider value={form}>{children}</FormProvider>;
};

SectionEditForm.TitleInput = SectionTitleInput;
SectionEditForm.TextInput = SectionTextInput;
