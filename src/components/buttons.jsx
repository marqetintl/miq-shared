import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { getClassName } from "@miq/utils";

const propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    maxSize: PropTypes.number,
    Icon: PropTypes.object.isRequired,
};

export const IconButton = ({ Icon, label, ...props }) => {
    const { maxSize, ...rest } = props;
    if (!Icon) return null;

    return (
        <button
            title={label}
            type="button"
            {...rest}
            className={getClassName(["btn btn-icon", props.className])}
        >
            <Icon className="icon" height={maxSize} width={maxSize} />
            {label && <span className="label">{label}</span>}
        </button>
    );
};
IconButton.propTypes = propTypes;

export const IconNavLink = ({ Icon, label, ...props }) => {
    if (!Icon || !props.to) return null;

    return (
        <NavLink {...props} className={getClassName(["btn btn-icon", props.className])}>
            <Icon className="icon" />
            {label && <span className="label">{label}</span>}
        </NavLink>
    );
};
IconNavLink.propTypes = propTypes;
