import { isEqual } from "lodash";
import { HTTP } from "./requests";

export const getService = (request, path, params) =>
    new Promise((resolve, reject) =>
        request
            .get(path, { params })
            .then(({ data }) => resolve(data))
            .catch((err) => reject(err))
    );

/**
 * POST SERVICE
 * @param {*} request
 * @param {String} path
 * @param {Object} values
 * @param {Object} config
 * @returns
 */
export const postService = (request, path, values, config) =>
    new Promise((resolve, reject) =>
        request
            .post(path, values, config)
            .then(({ data }) => resolve(data))
            .catch((err) => reject(err))
    );

export const services = (request = HTTP) => ({
    get(path, params) {
        return getService(request, path, params);
    },
    post(path, values, config) {
        return postService(request, path, values, config);
    },
    patch(path, values, oldValues, config) {
        return new Promise((resolve, reject) => {
            if (oldValues && isEqual(values, oldValues)) {
                return resolve({ isUpdated: false });
            }

            request
                .patch(path, values, config)
                .then(({ data }) => resolve({ ...data, isUpdated: true }))
                .catch((err) => reject(err));
        });
    },
    delete(path) {
        return new Promise((resolve, reject) =>
            request
                .delete(path)
                .then((res) => {
                    if (!res.status === 204) return reject(res);
                    return resolve({ deleted: true });
                })
                .catch((err) => reject(err))
        );
    },
});
