import { forwardRef, useContext } from "react";
import PropTypes from "prop-types";

import { getClassName, isRequired, IS_DEV } from "@miq/utils";
import FormCtx from "./FormCtx";
import Label from "./Label";

const CheckboxInput = forwardRef(({ label, ...props }, ref) => {
    const ctx = useContext(FormCtx) || isRequired("FormCtx");
    const { name = isRequired("name prop") } = props;
    let { checked, onChange } = props;

    if (Object.keys(ctx.values).includes(name)) {
        // props["checked"] = ;
    }

    onChange = onChange || ctx.toggleCheck;

    return (
        <div className="miq-checkbox">
            <input {...props} type="checkbox" {...{ onChange }} checked={checked || ctx.values[name]} ref={ref} />

            <Label value={label} className="miq-checkbox-label" />
        </div>
    );
});

CheckboxInput.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    checked: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default CheckboxInput;

if (IS_DEV) {
    CheckboxInput.displayName = "CheckboxInput";
}
