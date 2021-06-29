import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { getClassName } from "@miq/utils";

import "./buttons.scss";
import { forwardRef } from "react";

const propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

/**
 *
 */
export const Button = forwardRef(({ children, ...props }, ref) => {
    const { type = "button" } = props;
    return (
        <button {...props} {...{ type }} className={getClassName(["btn", props.className])}>
            {children}
        </button>
    );
});

Button.displayName = "Button";
Button.propTypes = propTypes;

const IBPropTypes = {
    ...propTypes,
    label: PropTypes.string,
    maxSize: PropTypes.number,
    Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const IconButton = ({ Icon, label, ...props }) => {
    const { maxSize, labelFirst, primary, secondary, ...rest } = props;
    if (!Icon) return null;

    return (
        <button
            title={props.label}
            aria-label={props.title || props.label}
            type="button"
            {...rest}
            className={getClassName(["btn btn-icon", primary ? "primary" : secondary && "secondary", props.className])}
        >
            <Icon className="icon" height={maxSize} width={maxSize} />
            {label && <span className="label">{label}</span>}
        </button>
    );
};
IconButton.propTypes = IBPropTypes;

/**
 *
 * @param {*} param0
 * @returns
 */
export const IconNavLink = ({ Icon, label, ...props }) => {
    if (!Icon || !props.to) return null;

    return (
        <NavLink {...props} className={getClassName(["btn btn-icon", props.className])}>
            <Icon className="icon" />
            {label && <span className="label">{label}</span>}
        </NavLink>
    );
};
IconNavLink.propTypes = IBPropTypes;
