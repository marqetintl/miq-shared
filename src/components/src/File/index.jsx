import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const accept = [
    `image/*`,
    `.pdf`,
    `.md`,
    `.doc`,
    `.docx`,
    `application/msword`,
    `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
].join(",");

export const FileInput = forwardRef(({ name = "files", ...props }, ref) => {
    return ReactDOM.createPortal(
        <input
            name={name}
            accept={accept}
            {...props}
            type="file"
            style={{ ...props.style, display: "none" }}
            ref={ref}
        />,
        document.body
    );
});

FileInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    accept: PropTypes.string,
    style: PropTypes.object,
    multiple: PropTypes.bool,
};
