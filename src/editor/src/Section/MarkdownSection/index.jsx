import { getClassName, IS_DEV } from "@miq/utils";
import { forwardRef } from "react";

import "highlight.js/styles/atelier-cave-dark.css";
import "./md-section.scss";

import { Icons } from "@miq/components";
import Form, { FormProvider, useForm } from "@miq/form";
import { SectionFooter, SectionHeader, SectionBody } from "../section-ui";
import { SectionDeleteButton, SectionEditButton } from "../section-components";
import render from "../section-renderers";

/**
 * MARKDOWN SECTION
 */

const MdSectionEdit = (props) => {
    return (
        <div className="">
            <Form.TextAreaX autoFocus clearFocus name="text" placeholder="# Mardown is supported ..." />
        </div>
    );
};

const MdSectionPreview = (props) => {
    if (props.context.isEdit) return <MdSectionEdit {...props} />;

    return (
        <div className="">
            <div dangerouslySetInnerHTML={{ __html: props.data.html || "Nothing to preview" }} />
        </div>
    );
};

const MarkdownSection = forwardRef((props, ref) => {
    const form = useForm({ text: props.data.text || "" });
    const { data } = props;
    const update = props.context.update;

    const handleSave = () => {
        if (!data) return;

        const { type } = data;

        update(
            props.data.slug,
            { type, text: form.values.text, html: render({ ...form.values, type }) },
            { type, text: data.text }
        ).then((res) => {
            props.context.setEdit(false);
        });
    };

    return (
        <FormProvider value={form}>
            <div id={props.id} {...{ ref }} className={getClassName([props.className, "section-md"])}>
                <SectionHeader Icon={Icons.Markdown} />

                <SectionBody>
                    <MdSectionPreview {...props} />
                </SectionBody>

                <SectionFooter>
                    <div className="actions">
                        <SectionDeleteButton {...props} label="Delete" />

                        <div className="actions-primary">
                            <SectionEditButton
                                context={props.context}
                                form={form}
                                data={props.data}
                                onSave={handleSave}
                            />
                        </div>
                    </div>
                </SectionFooter>
            </div>
        </FormProvider>
    );
});

if (IS_DEV) {
    MarkdownSection.displayName = "MarkdownSection";
}

export default MarkdownSection;
