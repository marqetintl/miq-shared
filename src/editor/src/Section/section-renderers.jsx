import ReactDOMServer from 'react-dom/server';
import marked from 'marked';

import { isRequired } from '@miq/utils';
import { Jumbotron } from '@miq/components';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';

    return hljs.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

export const componentToHtml = (Component) => ReactDOMServer.renderToStaticMarkup(Component);

export default function render(data) {
  const { type = isRequired('section type') } = data;

  switch (type) {
    case 'MD':
      return marked(data.text);

    case 'JUMB':
      return componentToHtml(<Jumbotron {...data} />);

    case 'CLOSE':
      return componentToHtml(<CloseTemplateRender {...data} />);

    default:
      return `<div>${data.text}</div>`;
  }
}

/**
 * UI
 */

const CloseTemplateRender = (data = {}) => {
  const { title, text, image } = data;

  return (
    <div className="close-template" style={{ backgroundImage: image ? `url(${image.src})` : null }}>
      <div className="close-template-inner">
        <div className="text-center p-3">
          {title && <h1 className="close-template-title mb-1">{title}</h1>}
          {text && <h3 className="close-template-text">{text}</h3>}
        </div>
      </div>
    </div>
  );
};
