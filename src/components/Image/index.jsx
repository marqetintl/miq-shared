import React from "react";
import { getClassName, getImgUrl } from "@miq/utils";

import { Image as ImgIcon } from "../icons";
import "./image.scss";

/**
 * IMAGE SQUARE
 */

export const ImgSquare = (props) => {
    let { src, className, maxSize = 75 } = props;
    if (!src) return <ImgPlaceholderDiv {...props} />;

    return (
        <div
            // {...{ ...props.style, width: `${maxSize}px`, height: `${maxSize}px` }}
            className="img-square"
            onClick={props.onClick}
        >
            <img
                id={props.id}
                src={getImgUrl(src)}
                alt={props.alt_text || ""}
                className={getClassName(["img-square-content", className])}
            />
        </div>
    );
};

/**
 * IMAGE
 */

export default function Img(props) {
    let { Icon = ImgIcon, src, ...rest } = props;
    if (!src) return <ImgPlaceholderDiv {...props} {...{ Icon }} />;

    return <img {...rest} src={getImgUrl(src)} alt={props.alt_text || ""} />;
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
