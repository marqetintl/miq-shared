import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";

import TextareaX from "../components/inputs/TextareaX";
import { getClassName, isRequired, IS_DEV } from "../utils";
import FormCtx from "./FormCtx";

const withInput = (Component, args = {}) => {
    return forwardRef((props, ref) => {
        props = { ...args, ...props };
        const ctx = useContext(FormCtx) || isRequired("FormCtx");
        const { name = isRequired("name prop") } = props;
        let { value, checked, onChange } = props;

        if (Object.keys(ctx.values).includes(name)) {
            if (props.type === "checkbox") checked = ctx.values[name];
            else value = ctx.values[name];
        }

        onChange = onChange || ctx.handleChange;

        return (
            <Component
                {...props}
                className={getClassName([args.className, props.className])}
                {...{ value, checked, onChange }}
                ref={ref}
            />
        );
    });
};

export const TextInput = withInput("input", { className: "input" });
TextInput.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

export const CheckboxInput = withInput("input", {
    type: "checkbox",
    className: "input input-checkbox",
});

CheckboxInput.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    checked: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

export const TextArea = withInput("textarea", { className: "textarea" });
export const TextAreaX = withInput(TextareaX);

if (IS_DEV) {
    TextInput.displayName = "TextInput";
    CheckboxInput.displayName = "CheckboxInput";

    TextArea.displayName = "TextArea";
    TextAreaX.displayName = "TextAreaX";
}
