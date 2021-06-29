import React from "react";
import { getClassName, getImgUrl } from "@miq/utils";

import { Image as ImgIcon } from "../icons";
import "./image.scss";

/**
 * IMAGE
 */

export default function Img(props) {
    let { Icon = ImgIcon, src, ...rest } = props;
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
