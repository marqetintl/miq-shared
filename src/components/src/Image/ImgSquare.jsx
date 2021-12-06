import React from "react";
import { getClassName, getImgUrl } from "@miq/utils";
import { ImgPlaceholderDiv } from "./ImgPlaceholderDiv";

export const ImgSquare = (props) => {
    let { src, className } = props;
    if (!src) return <ImgPlaceholderDiv {...props} />;

    return (
        <div
            id={props.id}
            className={getClassName(["miq-img-square", props.className])}
            onClick={props.onClick}
            style={props.style}
        >
            <img
                id={props.id}
                src={getImgUrl(src)}
                alt={props.alt_text || ""}
                className={getClassName(["miq-img-square-content", className])}
            />
        </div>
    );
};
