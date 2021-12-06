/**
 * NOT WORKING YET
 */

import { createRef, forwardRef, useEffect, useState } from "react";
import { getClassName } from "@miq/utils";

import "./main.scss";

/**
 *
 * @param {*} param0
 * @returns
 */

const Img = ({ src, height, width, ...props }) => {
    const ref = createRef();
    const [rowEnd, setRowEnd] = useState(0);

    useEffect(() => {
        const img = ref.current;
        if (!img) return;

        const handleLoad = () => {
            const r = width / height;
            const cWidth = img.clientWidth;
            const cHeight = Math.floor(cWidth / r);
            setRowEnd(cHeight);
        };

        img.addEventListener("load", handleLoad);
        handleLoad();
        return () => img.removeEventListener("load", handleLoad);
    }, []);

    return (
        <ItemDiv style={{ gridRowEnd: `span ${rowEnd}` }}>
            <img
                {...props}
                src={src}
                alt={props.alt_text || ""}
                className={getClassName(["miq-masonry-img", props.className])}
                ref={ref}
            />
        </ItemDiv>
    );
};

/**
 *
 * @param {*} param0
 * @returns
 */
const ItemDiv = ({ children, ...props }) => (
    <div {...props} className={getClassName(["miq-masonry-item", props.className])}>
        {children}
    </div>
);

/**
 *
 */

export const MasonryGrid = forwardRef(({ children, ...props }, ref) => {
    return (
        <div className="miq-masonry-grid" ref={ref}>
            {children}
        </div>
    );
});

MasonryGrid.Img = Img;
MasonryGrid.ItemDiv = ItemDiv;

/**
 *
 */
export const MasonryColumn = forwardRef(({ children, ...props }, ref) => {
    return (
        <div className="miq-masonry-column" ref={ref}>
            {children}
        </div>
    );
});
