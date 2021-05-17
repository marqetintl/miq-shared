import { forwardRef } from "react";
import PropTypes from "prop-types";

import "./form.scss";
import { TextArea, TextAreaX, TextInput, CheckboxInput } from "./TextInput";
import { FormProvider } from "./FormCtx";

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,

    children: PropTypes.node,
    context: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

const Form = forwardRef(({ children, context, ...props }, ref) => {
    return (
        <FormProvider value={context}>
            <form {...props} ref={ref}>
                {children}
            </form>
        </FormProvider>
    );
});

Form.TextInput = TextInput;
Form.CheckboxInput = CheckboxInput;
Form.TextArea = TextArea;
Form.TextAreaX = TextAreaX;

Form.propTypes = propTypes;

export default Form;
