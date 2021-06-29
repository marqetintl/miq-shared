import { getService } from "@miq/utils";

export const sectionService = {
    path: `sections/`,
    list(request, params) {
        console.log(params);
        return getService(request, this.path, params, "SET_SECTIONS");
    },
    get(sectSlug, params, type = "PREPEND_SECTION") {
        return actions.get(`${this.path}${sectSlug}/`, params, type);
    },
    post(values, type = "PREPEND_SECTION") {
        return actions.post(`${path}`, values, type);
    },
    patch(sectSlug, values, oldValues) {
        return actions.patch(`${path}${sectSlug}/`, values, oldValues, "UPDATE_SECTION");
    },
    delete(sectSlug) {
        return actions.delete(`${path}${sectSlug}/`, sectSlug, "REMOVE_SECTION");
    },
};

export const sectionsReducer = (state = { results: [] }, action) => {
    const { type, payload = {} } = action;
    let { results } = payload;

    switch (type) {
        case "SET_SECTIONS":
            return { ...payload };

        case "APPEND_SECTION":
            results = addOrUpdateArrayObject(state.results, payload, "slug", true);
            return { ...state, results };

        case "PREPEND_SECTION":
            results = addOrUpdateArrayObject(state.results, payload);
            return { ...state, results };

        case "UPDATE_SECTION":
            results = addOrUpdateArrayObject(state.results, payload);
            return { ...state, results };

        case "REMOVE_SECTION":
            results = state.results.filter(({ slug }) => slug !== payload.slug);
            return { ...state, results };

        default:
            return { ...state };
    }
};
