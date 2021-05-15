import PropTypes from "prop-types";

import { useEffect, useState, createContext } from "react";
import { getSharedData } from "./utils";

export const SharedDataCtx = createContext();

export const SharedDataProvider = ({ children }) => {
    const [value, setValue] = useState({ isLoaded: false });

    const path = window.location.href;

    useEffect(() => {
        // setValue({ isLoaded: false });

        getSharedData()
            .then((data) => {
                setValue({ ...data, isLoaded: true });
            })
            .catch((err) => {
                setValue({ isLoaded: false });
                console.log(err);
            });
    }, [path]);

    return <SharedDataCtx.Provider value={value}>{children}</SharedDataCtx.Provider>;
};

SharedDataProvider.propTypes = {
    // children: PropTypes.arrayOf([PropTypes.node]).isRequired,
};
