import marked from "marked";
import ReactDOMServer from "react-dom/server";

import { isRequired } from "@miq/utils";

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
        const hljs = require("highlight.js");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";

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
    const { type = isRequired("section type") } = data;

    switch (type) {
        case "MD":
            return marked(data.text);

        default:
            return `<div>${data.text}</div>`;
    }
}

/**
 * UI
 */
