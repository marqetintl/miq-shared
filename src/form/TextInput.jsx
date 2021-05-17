import React, { forwardRef, useContext } from "react";

import TextareaX from "../components/inputs/TextareaX";
import { isRequired, IS_DEV } from "../utils";
import FormCtx from "./FormCtx";

const withInput = (Component) =>
    forwardRef((props, ref) => {
        const ctx = useContext(FormCtx) || isRequired("FormCtx");
        const { name = isRequired("name prop") } = props;
        let { value, onChange } = props;

        if (Object.keys(ctx.values).includes(name)) {
            value = ctx.values[name];
        }

        onChange = onChange || ctx.handleChange;

        return <Component {...props} {...{ value, onChange }} ref={ref} />;
    });

export const TextInput = withInput("input");
export const TextArea = withInput("textarea");
export const TextAreaX = withInput(TextareaX);

if (IS_DEV) {
    TextInput.displayName = "TextInput";
    TextArea.displayName = "TextArea";
    TextAreaX.displayName = "TextAreaX";
}
