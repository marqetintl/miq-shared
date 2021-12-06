export const IS_DEV = process.env.NODE_ENV !== 'production';

export const DOMAIN = IS_DEV ? `http://127.0.0.1:8000` : `${window.location.origin}`;
// export const DOMAIN = IS_DEV ? `http://192.168.1.243:8000` : `${window.location.origin}`;

export const API_ENDPOINT = `${DOMAIN}${process.env.REACT_APP_API_ENDPOINT}`;
export const STAFF_PATH = process.env.REACT_STAFF_PATH || '/staff/';
