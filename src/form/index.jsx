import { forwardRef } from "react";
import PropTypes from "prop-types";

import "./form.scss";
import { TextArea, TextAreaX, TextInput } from "./TextInput";
import Label from "./Label";

import { FormProvider } from "./FormCtx";
import CheckboxInput from "./CheckboxInput";

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

Form.Submit = (props) => <input {...props} type="submit" />;
Form.Label = Label;
Form.TextInput = TextInput;
Form.CheckboxInput = CheckboxInput;
Form.TextArea = TextArea;
Form.TextAreaX = TextAreaX;

Form.propTypes = propTypes;

export default Form;
export { default as useForm } from "./useForm";
export { default as FormCtx, FormProvider } from "./FormCtx";
