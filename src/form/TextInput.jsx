import React, { forwardRef, useContext } from "react";

import TextareaX from "../components/inputs/TextareaX";
import { getClassName, isRequired, IS_DEV } from "../utils";
import FormCtx from "./FormCtx";

const withInput = (Component, args = {}) =>
    forwardRef((props, ref) => {
        const ctx = useContext(FormCtx) || isRequired("FormCtx");
        const { name = isRequired("name prop") } = props;
        let { value, onChange } = props;

        if (Object.keys(ctx.values).includes(name)) {
            value = ctx.values[name];
        }

        onChange = onChange || ctx.handleChange;

        return (
            <Component
                {...args}
                {...props}
                className={getClassName([args.className, props.className])}
                {...{ value, onChange }}
                ref={ref}
            />
        );
    });

export const TextInput = withInput("input", { className: "input" });
export const CheckboxInput = withInput("input", {
    type: "checkbox",
    className: "input input-checkbox",
});

export const TextArea = withInput("textarea", { className: "textarea" });
export const TextAreaX = withInput(TextareaX);

if (IS_DEV) {
    TextInput.displayName = "TextInput";
    CheckboxInput.displayName = "CheckboxInput";

    TextArea.displayName = "TextArea";
    TextAreaX.displayName = "TextAreaX";
}
