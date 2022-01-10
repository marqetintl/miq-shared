import { useContext } from 'react';
import PropTypes from 'prop-types';
import isInteger from 'lodash.isinteger';
import isArray from 'lodash.isarray';

import { SharedDataCtx } from '@miq/contexts';
import { services, getClassName, getImgUrl } from '@miq/utils';

import { ToastCtx } from '../Toast';

import { PersonCircle as PersonIcon } from '../icons';
import { ImgSquare } from '../Image';
import { ImgUploadButton } from '../Image/ImgUpdloadButton';

import './Avatar.scss';

export const Avatar = (props) => {
  const src = props.thumb_sq || props.thumb || props.src;
  return (
    <ImgSquare Icon={PersonIcon} {...props} src={src} className={getClassName(['miq-user-avatar', props.className])} />
  );
};

Avatar.propTypes = {};

export const AvatarGroup = ({ users, count, limit = 4, ...props }) => {
  if (!isArray(users) || !users.length) return null;

  if (limit < 2 || !isInteger(limit)) limit = 2;

  return (
    <div className="miq-user-avatar-group">
      {users.slice(0, limit).map((user) => {
        let src = user.thumb_sq || user.thumb || user.src;
        if (src) src = getImgUrl(src);
        return (
          <div
            className={getClassName(['miq-user-avatar-item', !src && 'empty'])}
            title={user.name}
            style={{ backgroundImage: `url(${src})` }}
            key={user.slug}
          >
            {!src && <span>{user.initials}</span>}
          </div>
        );
      })}
      {users.length > limit && (
        <div className="miq-user-avatar-item count" title={`Ce document est partagé avec ${count} personnes.`}>
          {count}
        </div>
      )}
    </div>
  );
};

AvatarGroup.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      thumb_sq: PropTypes.string,
      thumb: PropTypes.string,
      src: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      initials: PropTypes.string,
    })
  ),
};

const UpdateAvatarImg = (imgSlug) =>
  services().patch(
    `/api/v1/account/current/`,
    { img: imgSlug },
    {},
    { headers: { 'Content-Type': 'application/json' } }
  );

export const AvatarUploadButton = ({ children, ...props }) => {
  const toaster = useContext(ToastCtx);
  const { user, updateUser } = useContext(SharedDataCtx);

  const saveImage = ({ slug }) => {
    UpdateAvatarImg(slug).then((img_data) => {
      updateUser({ img_data });
      if (toaster) {
        toaster.success({ message: 'Avatar updated!', timeOut: 3000 });
      }
    });
  };

  const updateImage = (img_data) => {
    updateUser({ img_data });
    if (toaster) {
      toaster.success({ message: 'Avatar updated!', timeOut: 3000 });
    }
  };

  return (
    <ImgUploadButton
      id={props.id}
      className={getClassName(['avatar-upload-btn', props.className])}
      accept=".jpg,.jpeg,.png,.gif"
      slug={user.img ? user.img_data.slug : null}
      onCreate={saveImage}
      onUpdate={updateImage}
    >
      {children || <Avatar {...user.img_data} />}
    </ImgUploadButton>
  );
};

AvatarUploadButton.propTypes = {
  children: PropTypes.any,
};
