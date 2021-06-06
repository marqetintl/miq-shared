import axios from "axios";
import { isDate } from "lodash";

export const IS_DEV = process.env.NODE_ENV !== "production";

export const DOMAIN = IS_DEV ? `http://127.0.0.1:8000` : `${window.location.origin}`;

// AXIOS

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.headers["Content-Type"] = "text/html; charset=UTF-8";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const HTTP = axios.create({
    baseURL: DOMAIN,
    timeout: 3000,
    withCredentials: true, // To enable cookies
    headers: { "X-Requested-With": "XMLHttpRequest" },
    onUploadProgress: (progressEvt) => {
        // console.log(Math.round(progressEvt.loaded / progressEvt.total * 100) + '%')
    },
});

// DATE HELPERS

export const formatDate = (date, format = { weekday: "short", month: "long", day: "numeric" }) => {
    const date_time = new Intl.DateTimeFormat("en-US", {
        ...format,
        //    weekday: "short",
        //    month: "long",
        //    day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
        // year: 'numeric',
    });
    return date_time.format(new Date(date));
};

export const formatDateToStr = (date) => {
    if (!isDate(date)) return "";

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
};

export const formatTime = (date, format = { hour: "numeric", minute: "numeric" }) => {
    const date_time = new Intl.DateTimeFormat("en-US", { ...format });
    return date_time.format(new Date(date));
};

// HELPERS

export const getSharedData = () =>
    new Promise(async (resolve, reject) => {
        let sharedData = document.getElementById("sharedData");

        if (!sharedData && IS_DEV) {
            // This will not run in production
            console.log(`Getting page shared data in ${process.env.NODE_ENV} mode`);

            const base = new URL(window.location.href);
            const path = `${base.pathname}${base.search}`;

            let res;
            try {
                res = await HTTP.get(path);
            } catch (err) {
                return reject(err);
            }

            if (!res || res.status !== 200) return reject("No data");

            if (res.headers["content-type"].includes("text")) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res.data, "text/html");
                sharedData = doc.getElementById("sharedData");
            }
        }
        if (sharedData) {
            return resolve(JSON.parse(sharedData.textContent));
        }

        return resolve({});
    });

/**
 *
 * @param {Array} df
 * @returns {String}
 */

export const getClassName = (df = []) => {
    let className;
    if (Array.isArray(df)) {
        className = df
            .map((i) => i && `${i}`)
            .filter(Boolean)
            .join(" ");
    }
    return className;
};

/**
 *
 * @param {String} src
 * @returns {String}
 */

export const getImgUrl = (src) => {
    if (IS_DEV && src) {
        const domain = new URL(DOMAIN);
        if (!src.includes("http")) {
            src = `${domain.origin}${src}`;
        }
    }
    return src;
};

export const addForwardSlash = (str = isRequired("string param")) =>
    str.endsWith("/") ? str : `${str}/`;

export const isRequired = (name = "Param") => {
    throw new Error(`${name} is required`);
};
