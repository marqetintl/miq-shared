import ReactDOMServer from 'react-dom/server';
import marked from 'marked';

import { isRequired } from '@miq/utils';
import { Jumbotron, Picture, ImgsHorizontalGallery, ImgsVerticalGallery } from '@miq/components';

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

  const className = 'mb-1';

  switch (type) {
    case 'MD':
      return marked(data.text);

    case 'IMG':
      return componentToHtml(<Picture {...data.image} className={className} />);

    case 'HGAL':
      return componentToHtml(<ImgsHorizontalGallery images={data.images_data} className={className} />);

    case 'VGAL':
      return componentToHtml(<ImgsVerticalGallery images={data.images_data} className={className} />);

    case 'JUMB':
      return componentToHtml(<Jumbotron {...data} className={className} />);

    default:
      return `<div class="${className}">${data.text}</div>`;
  }
}
