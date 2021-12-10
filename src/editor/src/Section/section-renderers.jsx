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

    default:
      return `<div>${data.text}</div>`;
  }
}
