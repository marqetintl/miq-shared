import PropTypes from "prop-types";

import "./textareax.scss";
import { getClassName } from "@miq/utils";

const { forwardRef } = require("react");

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),

    value: PropTypes.string,
    required: PropTypes.bool,

    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,

    style: PropTypes.object,
    placeholder: PropTypes.string,
    clearFocus: PropTypes.bool,
};

const TextareaX = forwardRef((props, ref) => {
    const { id, clearFocus, value, onChange, placeholder = "Start typing ...", ...rest } = props;
    const style = props.style;

    return (
        <div id={id} className={getClassName(["textareax", clearFocus && "clear-focus"])}>
            <span className="textareax-mirror" {...{ style }}>{`${value}\n`}</span>

            <div className="textareax-input">
                <textarea {...rest} {...{ value, onChange, placeholder, style }} ref={ref} />
            </div>
        </div>
    );
});

TextareaX.propTypes = propTypes;

export default TextareaX;
