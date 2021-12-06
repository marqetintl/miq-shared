import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { isFunction } from "lodash";

import { getClassName } from "@miq/utils";

const propTypes = {
    level: PropTypes.string,
    message: PropTypes.string,
    component: PropTypes.node,
    render: PropTypes.func,
    ctx: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    timeOut: PropTypes.number,
    autoClose: PropTypes.bool,
};

export function ToastItem({ ctx, ...props }) {
    const { id, timeOut = 5000, autoClose = true } = props;
    const { remove } = ctx;
    const removeItem = useCallback(
        () =>
            setInterval(() => {
                remove(id);
            }, timeOut),
        [id, timeOut]
    );

    useEffect(() => {
        if (!autoClose) return;
        const interval = removeItem();

        return () => {
            clearInterval(interval);
        };
    }, [removeItem, autoClose]);

    let Comp = props.message || props.component;
    if (isFunction(props.render)) Comp = props.render(props);

    const { level } = props;
    const className = getClassName(["miq-toast-item", level && `${level}`, props.className]);

    return <div className={className}>{Comp}</div>;
}

ToastItem.propTypes = propTypes;
