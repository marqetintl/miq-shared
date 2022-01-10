import PropTypes from 'prop-types';

import { IconButton, Icons, ImgUploadButton } from '@miq/components';

import { isRequired, getClassName, patchService, API } from '@miq/utils';
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
  const { data = isRequired('section data') } = props;

  return (
    <IconButton
      Icon={Icons.Trash}
      title="Delete"
      onClick={() =>
        sectionServices.delete(data.slug).then((res) => {
          props.onSuccess && props.onSuccess({ ...res });
        })
      }
      className={getClassName(['section-btn btn-danger', props.className])}
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
  context: PropTypes.shape({ isEdit: PropTypes.bool }).isRequired,
};

export const SectionImgUploadButton = ({ imgSlug, section = isRequired('Section data'), ...props }) => {
  if (!section.slug) return null;

  const { type } = section;
  const { onCreate, onUpdate, ...rest } = props;

  const handleUpload = ({ isUpdated, ...imgData }, isPatch = false) => {
    const { slug } = imgData;

    // TODO
    let images = section.images || [];
    if (!images.includes(slug)) {
      images.push(slug);
    }
    let images_data = [...section.images_data, imgData];
    if (isPatch) {
      images_data = section.images_data.map((img) => {
        if (img.slug === imgData.slug) return imgData;
        return img;
      });
    }

    const html = render({ ...section, image: imgData, images, images_data });
    return sectionServices.patch(section.slug, { type, images, html }).then((sectionData) => {
      if (sectionData.isUpdated) {
        if (imgSlug && onUpdate) return onUpdate(sectionData);

        onCreate && onCreate(sectionData);
      }
    });
  };

  return (
    <ImgUploadButton {...rest} onCreate={handleUpload} onUpdate={(data) => handleUpload(data, true)} slug={imgSlug} />
  );
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

export const SectionImgAltTextInput = ({ img = {}, ...props }) => {
  if (!img || !img.slug) return null;

  const { form = isRequired('form'), onSuccess } = props;

  return (
    <Form.TextInput
      placeholder="Write alt text..."
      onSave={({ value }) => {
        return patchService(API, `images/${img.slug}/`, { alt_text: value }, {})
          .catch((err) => form.handleError(err))
          .then((imgData) => {
            onSuccess && onSuccess(imgData);
          });
      }}
      required
      {...props}
      name="alt_text"
      error={form.errors.alt_text}
      maxLength={99}
    />
  );
};

/**
 * FORM
 */

export const SectionEditForm = ({ form = isRequired('form'), children, ...props }) => {
  return <FormProvider value={form}>{children}</FormProvider>;
};

SectionEditForm.TitleInput = SectionTitleInput;
SectionEditForm.TextInput = SectionTextInput;
SectionEditForm.ImgAltTextInput = SectionImgAltTextInput;
