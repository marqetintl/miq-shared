import { useEffect, useState, createContext } from "react";
import { getSharedData } from "@miq/utils";

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

    if (!value.isLoaded) return <div>Loading ...</div>;

    return <SharedDataCtx.Provider value={value}>{children}</SharedDataCtx.Provider>;
};

SharedDataProvider.propTypes = {
    // children: PropTypes.arrayOf([PropTypes.node]).isRequired,
};
