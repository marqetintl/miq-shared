import React from "react";
import { getClassName, getImgUrl } from "@miq/utils";

import "./image.scss";

/**
 * IMAGE
 */

export default function Img(props) {
    let { Icon, src, ...rest } = props;
    if (!src) return <ImgPlaceholderDiv {...props} {...{ Icon }} />;

    src = getImgUrl(src);

    return <img {...rest} src={src} alt={props.alt_text || ""} />;
}

/**
 * IMAGE PLACEHOLDER
 */

export const ImgPlaceholderDiv = (props) => {
    let { Icon = ImgIcon, ...rest } = props;

    return (
        <div {...rest} className={getClassName(["img-placeholder", rest.className])}>
            <Icon className="icon" />
        </div>
    );
};

const ImgIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
        {...props}
    >
        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
    </svg>
);
