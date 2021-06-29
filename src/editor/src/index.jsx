import React, { useEffect, useReducer } from "react";

import { isRequired } from "@miq/utils";
import "./index.scss";

import Section from "./Section";
import { sectionsReducer, sectionService } from "./Section/utils";

export default function Editor({ sourceSlug = isRequired("source slug"), children, ...props }) {
    return <div className="">{children}</div>;
}

export const EditorSections = ({
    sourceSlug = isRequired("source slug"),
    request = isRequired("request"),
    ...props
}) => {
    const [sections, dispatch] = useReducer(sectionsReducer, { results: [] });

    useEffect(() => {
        if (!sourceSlug) return;

        sectionService.list(request, { source: sourceSlug }).then((data) => {
            dispatch({ type: "SET_SECTIONS", payload: data });
            // setLoading(0);
        });
    }, [sourceSlug, request]);

    return (
        <div className="editor-panel">
            <div className="editor-content">
                <div className="editor-label">{/* <Form.TextAreaX name="label" tabIndex={1} maxLength={250} /> */}</div>

                <div className="editor-sections">
                    {sections.results.map((data) => (
                        <Section data={data} key={data.slug} />
                    ))}
                </div>

                <div className="editor-actions">
                    {/* <SectionAddButton sourceSlug={props.sourceSlug} type="TXT" />
                    <SectionAddButton sourceSlug={props.sourceSlug} type="MD" />
                    <SectionAddButton sourceSlug={props.sourceSlug} type="IMG" /> */}
                </div>
            </div>
        </div>
    );
};
