import './jumbotron.scss';

import { Img } from '..';

export const Jumbotron = ({ image, ...props }) => {
  const { title, text, url } = props;

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ position: `relative` }}>
      <div
        className=""
        style={{
          backgroundImage: image && `url(${image.src})`,
          backgroundPosition: `100% top`,
          position: `absolute`,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          margin: `auto`,
          backgroundSize: 'cover',
        }}
      ></div>
      {/* <div className="">
        {title && <h2>{title}</h2>}
        {text && <h4>{text}</h4>}
      </div> */}

      {/* <Img {...image} /> */}
    </div>
  );
};
