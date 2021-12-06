import { isEqual } from 'lodash';
import { addForwardSlash, isRequired } from './helpers';
import { API, HTTP } from './requests';

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
  new Promise((resolve, reject) => {
    return request
      .post(path, values, config)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });

/**
 *
 * @param {*} request
 * @param {*} path
 * @param {*} values
 * @param {*} oldValues
 * @param {*} config
 * @returns
 */
export const patchService = (request, path, values, oldValues, config) =>
  new Promise((resolve, reject) => {
    if (oldValues && isEqual(values, oldValues)) {
      return resolve({ isUpdated: false });
    }

    return request
      .patch(path, values, config)
      .then(({ data }) => resolve({ ...data, isUpdated: true }))
      .catch((err) => reject(err));
  });

/**
 *
 * @param {*} request
 * @param {*} path
 * @returns
 */

export const deleteService = (request, path) =>
  new Promise((resolve, reject) =>
    request
      .delete(path)
      .then((res) => {
        if (res.status !== 204) return reject(res);
        return resolve({ deleted: true });
      })
      .catch((err) => reject(err))
  );

/**
 *
 * @param {*} request
 * @returns
 */

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
          if (res.status !== 204) return reject(res);
          return resolve({ deleted: true });
        })
        .catch((err) => reject(err))
    );
  },
});

/**
 *
 */

class Service {
  request = HTTP;
  path = null;

  constructor(path = isRequired('path')) {
    // this.request = request;
    this.path = addForwardSlash(path);
  }

  list(params) {
    return this.get(this.path, params);
  }

  detail(slug, params) {
    slug = addForwardSlash(slug);
    return this.get(`${this.path}${slug}`, params);
  }

  get(path, params) {
    return getService(this.request, path, params);
  }

  post(values, config, path) {
    return postService(this.request, path || `${this.path}`, values, config);
  }

  patch(slug, values, oldValues, config) {
    slug = addForwardSlash(slug);
    return patchService(this.request, `${this.path}${slug}`, values, oldValues, config);
  }

  patchPath(path, values, oldValues, config) {
    return patchService(this.request, path, values, oldValues, config);
  }

  delete(slug) {
    slug = addForwardSlash(slug);
    return deleteService(this.request, `${this.path}${slug}`);
  }
}

/** */

class StaffService extends Service {
  request = API;

  constructor(path) {
    super(path);
  }
}

export { Service, StaffService };
