import { getClassName, IS_DEV } from "@miq/utils";
import { forwardRef } from "react";
import { Icons } from "@miq/components";
import { SectionDeleteButton, SectionEditButton } from "../section-components";
import { SectionBody, SectionFooter, SectionHeader } from "../section-ui";

import "./txt-section.scss";

/**
 * TEXT SECTION
 */

const TxtSectionEdit = (props) => {
    return <div className="">TxtSectionEdit</div>;
};

const TxtSectionPreview = (props) => {
    if (props.context.isEdit) return <TxtSectionEdit {...props} />;

    return <div className="">Prev</div>;
};

const TextSection = forwardRef((props, ref) => {
    return (
        <div id={props.id} {...{ ref }} className={getClassName([props.className])}>
            <SectionHeader Icon={Icons.TextareaT} />

            <SectionBody>
                <TxtSectionPreview {...props} />
            </SectionBody>

            <SectionFooter>
                <div className="actions">
                    <SectionDeleteButton {...props} label="Delete" />

                    <SectionEditButton context={props.context} />
                </div>
            </SectionFooter>
        </div>
    );
});

if (IS_DEV) {
    TextSection.displayName = "TextSection";
}

export default TextSection;
