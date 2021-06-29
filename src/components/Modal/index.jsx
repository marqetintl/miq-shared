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

export default function Modal({ id, className, header, children, footer, fullscreen }) {
    return (
        <div id={id} className="miq-modal-container">
            <div className="miq-modal-background" />

            <div className="miq-modal-inner">
                <div className="miq-modal-content">
                    <div
                        className={getClassName([
                            "miq-modal-content-inner",
                            fullscreen && "miq-modal-content-inner-fullscreen",
                        ])}
                    >
                        {header && <div className="miq-modal-header">{header}</div>}

                        <div className="miq-modal-body">{children}</div>

                        {footer && <div className="miq-modal-footer">{footer}</div>}
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
