import { useState } from "react";
import { v4 as uuid } from "uuid";
import { isFunction } from "lodash";

export const useToast = () => {
    const [items, setItems] = useState([]);

    const add = (toastData, callback) => {
        setItems((items) => [{ ...toastData, id: uuid() }, ...items]);
        isFunction(callback) && callback();
    };

    const update = (newToastData, callback) => {
        setItems((items) =>
            items.map((i) => {
                if (i.id === newToastData.id) return { ...i, ...newToastData };
                return i;
            })
        );
        isFunction(callback) && callback();
    };

    const remove = (toastId, callback) => {
        setItems((items) => items.filter((i) => i.id !== toastId));
        isFunction(callback) && callback();
    };

    const clear = (callback) => {
        setItems([]);
        isFunction(callback) && callback();
    };

    const success = (toastData, callback) => add({ ...toastData, level: "success" }, callback);
    const info = (toastData, callback) => add({ ...toastData, level: "info" }, callback);
    const warning = (toastData, callback) => add({ ...toastData, level: "warning" }, callback);
    const error = (toastData, callback) => add({ ...toastData, level: "error" }, callback);

    return { items, add, update, remove, clear, success, info, warning, error };
};
