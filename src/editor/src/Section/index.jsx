import { createContext, lazy, Suspense, useMemo, useRef, useState } from "react";

import { getClassName, isRequired } from "@miq/utils";
import TextSection from "./TextSection";

import "./section.scss";

// const MarkdownSection = lazy(()=>import('./MarkdownSection'))
// const ImageSection = lazy(() => import("./ImageSection"));

const getSectionComponent = (type) => {
    switch (type) {
        case "MD":
            return lazy(() => import("./MarkdownSection"));
        // return MarkdownSection;
        case "IMG":
            return lazy(() => import("./ImageSection"));
        // return ImageSection;

        default:
            return TextSection;
    }
};

const SectionCtx = createContext();

export default function Section(props) {
    const { data = isRequired("section data props") } = props;
    const { slug, type } = data;

    const ref = useRef();
    const [isEdit, setEdit] = useState(props.isEdit || false);

    const ctx = useMemo(() => {
        return {
            isEdit,
            setEdit,
            // update: sectionActions.patch, remove: sectionActions.delete, dispatch
        };
    }, [isEdit]);

    if (!slug) return null;

    const Component = getSectionComponent(type);

    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <SectionCtx.Provider value={ctx}>
                <Component
                    {...props}
                    context={ctx}
                    ref={ref}
                    className={getClassName(["section", isEdit && "active"])}
                />
            </SectionCtx.Provider>
        </Suspense>
    );
}
