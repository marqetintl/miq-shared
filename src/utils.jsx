import axios from "axios";

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

export const addForwardSlash = (str = isRequired("string param")) => (str.endsWith("/") ? str : `${str}/`);

export const isRequired = (name = "Param") => {
    throw new Error(`${name} is required`);
};
