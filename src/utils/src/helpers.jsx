import { DOMAIN, IS_DEV } from "./constants";
import { HTTP } from "./requests";

export function addOrUpdateArrayObject(arr, obj, key = "slug", append = false) {
    const arrKey = arr.map((i) => i[key]);

    if (!arrKey.includes(obj[key])) {
        if (append) return [...arr, obj];
        return [obj, ...arr];
    }

    return arr.map((i) => {
        if (i[key] === obj[key]) return obj;
        return i;
    });
}

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

export const getImgUrl = (src) => {
    if (IS_DEV && src) {
        const domain = new URL(DOMAIN);
        if (!src.includes("http")) {
            src = `${domain.origin}${src}`;
        }
    }
    return src;
};

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
