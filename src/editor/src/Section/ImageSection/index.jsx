import { forwardRef, useState } from 'react';

import { Img, Icons } from '@miq/components';
import { getClassName, IS_DEV, isRequired } from '@miq/utils';
import { useForm } from '@miq/form';

import './img-section.scss';

import { SectionDeleteButton, SectionEditForm, SectionImgUploadButton } from '../section-components';
import { SectionBody, SectionHeader } from '../section-ui';

import { sectionRequiredProps } from '../utils';

export const SectionImageUpdateForm = ({ image = isRequired('image'), children, ...props }) => {
  const { section = isRequired('section') } = props;
  const form = useForm({ alt_text: image ? image.alt_text : '' });
  if (!image)
    return (
      <SectionImgUploadButton
        section={section}
        imgSlug={image ? image.slug : null}
        onCreate={props.onDataChange}
        onUpdate={props.onDataChange}
      />
    );
  return (
    <SectionEditForm form={form}>
      <Img {...image} />

      <div className="mt-1 w-100">
        <SectionEditForm.ImgAltTextInput img={image} form={form} />
      </div>
    </SectionEditForm>
  );
};

const ImageSection = forwardRef((props, ref) => {
  const { className, id, ...rest } = props;
  const { image = {} } = rest.data;

  return (
    <div id={id} ref={ref} className={getClassName([className, 'section-img'])}>
      <SectionHeader Icon={Icons.Image}>
        <div className="d-flex">
          <SectionDeleteButton
            {...rest}
            onSuccess={(res) => {
              console.log(res);
            }}
            className="me-2"
          />
        </div>
      </SectionHeader>

      <SectionBody>
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 100 }}>
          <SectionImageUpdateForm image={image} section={rest.data} onDataChange={props.onDataChange} />
        </div>
      </SectionBody>
    </div>
  );
});

ImageSection.propTypes = {
  ...sectionRequiredProps,
};

export default ImageSection;

if (IS_DEV) {
  ImageSection.displayName = 'ImageSection';
}

/**
 * IMAGE SECTION
 * images Icon:viewlist
 * slider; distribute-horizontal
 */

const UploadTab = (props) => {
  const { tab } = props;

  if (tab === 'library') return <LibraryTab {...props} />;
  if (tab === 'unsplash') return <UnsplashTab {...props} />;

  return (
    <div className="tab-upload">
      <div className="">Click to upload an image</div>
      <div className="">or</div>
      <div className="">Paste url</div>
    </div>
  );
};
const LibraryTab = (props) => {
  return <div className="tab-library">Images from library</div>;
};

const UnsplashTab = (props) => {
  return <div className="tab-unsplash">Images from unsplash</div>;
};

const ImgSectionEdit = (props) => {
  const [tab, setTab] = useState('new');
  return (
    <div className="section-edit">
      <div className="">
        <button onClick={() => setTab('new')}>New</button>
        <button onClick={() => setTab('library')}>Library</button>
        <button onClick={() => setTab('unsplash')}>Unsplash</button>
      </div>

      <UploadTab {...{ tab }} />
    </div>
  );
};

const ImgSectionPreview = (props) => {
  const { data } = props;

  if (props.context.isEdit) return <ImgSectionEdit {...props} />;

  const src =
    'https://images.unsplash.com/photo-1621570070821-2e2b1358fae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wxfDF8YWxsfDF8fHx8fHwyfHwxNjIxOTkyNDMw&ixlib=rb-1.2.1&q=80&w=2000';

  return (
    <div
      className={getClassName(['section-preview', !data.image && 'empty'])}
      onClick={() => props.context.setEdit(!props.context.isEdit)}
    ></div>
  );
};
