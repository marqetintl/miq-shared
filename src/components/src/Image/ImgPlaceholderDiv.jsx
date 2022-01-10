import PropTypes from 'prop-types';

import { getClassName } from '@miq/utils';
import { Image as ImgIcon } from '../icons';

const propTypes = {
  // Icon: PropTypes.t,
  id: PropTypes.string,
  className: PropTypes.string,
};

export const ImgPlaceholderDiv = (props) => {
  let { Icon = ImgIcon, ...rest } = props;

  return (
    <div {...rest} className={getClassName(['miq-img-placeholder', rest.className])}>
      <Icon className="icon" />
    </div>
  );
};

ImgPlaceholderDiv.propTypes = propTypes;
