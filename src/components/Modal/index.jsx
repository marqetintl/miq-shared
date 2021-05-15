import React from "react";
import ReactDOM from "react-dom";

import "./modal.scss";

export const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
};

Portal.Modal = Modal;

export default function Modal({ id, header, children, footer }) {
    return (
        <div id={id} className="modal-container">
            <div className="modal-background" />
            <div className="modal-inner">
                <div className="modal-content">
                    <div className="modal-content-inner">
                        {header && <div className="modal-header">{header}</div>}
                        <div className="modal-body">{children}</div>
                        {footer && <div className="modal-footer">{footer}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
