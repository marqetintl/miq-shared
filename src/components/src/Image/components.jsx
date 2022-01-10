import { getClassName } from '@miq/utils/';
import { Picture } from './Img';

export const ImgsHorizontalGallery = ({ images = [], mobileOnly, ...props }) => {
  if (!images) return null;

  return (
    <div id={props.id} className={getClassName(['imgs-gallery-horizontal', props.className])}>
      <div className={getClassName(['imgs-gallery-horizontal-inner', mobileOnly && 'md-vertical'])}>
        {images.map((img) => {
          return (
            <div className="gallery-item" key={img.slug || img.src}>
              <Picture {...img} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ImgsVerticalGallery = ({ images = [], ...props }) => {
  return (
    <div id={props.id} className={getClassName(['imgs-gallery-vertical', props.className])}>
      {images.map((img) => {
        return (
          <div className="gallery-item mb-1" key={img.slug || img.src}>
            <Picture {...img} />
          </div>
        );
      })}
    </div>
  );
};
