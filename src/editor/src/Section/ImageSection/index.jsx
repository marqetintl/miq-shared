import { forwardRef, useState } from "react";

import { Img, Icons } from "@miq/components";
import { getClassName, IS_DEV } from "@miq/utils";

import "./img-section.scss";

import { SectionDeleteButton } from "../section-components";
import { SectionBody, SectionFooter, SectionHeader } from "../section-ui";

/**
 * IMAGE SECTION
 * images Icon:viewlist
 * slider; distribute-horizontal
 */

const ImgUploadButton = ({ children }) => {
    return (
        <div className="" onClick={() => console.log("Uploading...")}>
            {children}
        </div>
    );
};

const UploadTab = (props) => {
    const { tab } = props;

    if (tab === "library") return <LibraryTab {...props} />;
    if (tab === "unsplash") return <UnsplashTab {...props} />;

    return (
        <div className="tab-upload">
            <div className="">Click to upload an image</div>
            <div className="">or</div>
            <div className="">Paste url</div>
        </div>
    );
};
const LibraryTab = (props) => {
    return <div className="tab-library">Images from library</div>;
};

const UnsplashTab = (props) => {
    return <div className="tab-unsplash">Images from unsplash</div>;
};

const ImgSectionEdit = (props) => {
    const [tab, setTab] = useState("new");
    return (
        <div className="section-edit">
            <div className="">
                <button onClick={() => setTab("new")}>New</button>
                <button onClick={() => setTab("library")}>Library</button>
                <button onClick={() => setTab("unsplash")}>Unsplash</button>
            </div>

            <UploadTab {...{ tab }} />

            <ImgUploadButton />
        </div>
    );
};

const ImgSectionPreview = (props) => {
    const { data } = props;

    if (props.context.isEdit) return <ImgSectionEdit {...props} />;

    const src =
        "https://images.unsplash.com/photo-1621570070821-2e2b1358fae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wxfDF8YWxsfDF8fHx8fHwyfHwxNjIxOTkyNDMw&ixlib=rb-1.2.1&q=80&w=2000";

    return (
        <div
            className={getClassName(["section-preview", !data.image && "empty"])}
            onClick={() => props.context.setEdit(!props.context.isEdit)}
        >
            <Img Icon={Icons.CloudArrowUp} src={src} />
            {!data.image && <span>Click to upload an image</span>}
        </div>
    );
};

const ImageSection = forwardRef((props, ref) => {
    return (
        <div id={props.id} {...{ ref }} className={getClassName([props.className, "section-img"])}>
            <SectionHeader Icon={Icons.Image} />

            <SectionBody>
                <ImgSectionPreview {...props} />
            </SectionBody>

            <SectionFooter>
                <div className="actions">
                    <SectionDeleteButton {...props} />
                </div>
            </SectionFooter>
        </div>
    );
});

if (IS_DEV) {
    ImageSection.displayName = "ImageSection";
}

export default ImageSection;
