import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { getClassName } from "@miq/utils";

import "./modal.scss";

export const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
};

Portal.Modal = Modal;
Portal.propTypes = { children: PropTypes.node.isRequired };

export default function Modal({ id, header, children, footer, fullscreen }) {
    return (
        <div id={id} className="modal-container">
            <div className="modal-background" />
            <div className="modal-inner">
                <div className="modal-content">
                    <div
                        className={getClassName([
                            "modal-content-inner",
                            fullscreen && "modal-content-inner-fullscreen",
                        ])}
                    >
                        {header && <div className="modal-header">{header}</div>}
                        <div className="modal-body">{children}</div>
                        {footer && <div className="modal-footer">{footer}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    id: PropTypes.string,
    fullscreen: PropTypes.bool,

    header: PropTypes.node,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
};
