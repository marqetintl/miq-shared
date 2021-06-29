export const IS_DEV = process.env.NODE_ENV !== "production";

export const DOMAIN = IS_DEV ? `http://127.0.0.1:8000` : `${window.location.origin}`;
