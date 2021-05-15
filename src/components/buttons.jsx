import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { getClassName } from "../utils";

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
        <button title={label} {...rest} className={getClassName(["IconButton", props.className])}>
            <Icon className="Icon" height={maxSize} width={maxSize} />
            {label && <span className="Label">{label}</span>}
        </button>
    );
};
IconButton.propTypes = propTypes;

export const IconNavLink = ({ Icon, label, ...props }) => {
    if (!Icon || !props.to) return null;

    return (
        <NavLink {...props} className={getClassName(["IconButton", props.className])}>
            <Icon className="Icon" />
            {label && <span className="Label">{label}</span>}
        </NavLink>
    );
};
IconNavLink.propTypes = propTypes;
