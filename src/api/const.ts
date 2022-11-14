const IS_DEV = process.env.NODE_ENV !== 'production';

const DEV_API = 'https://eafdmmart-backend-dev-eafdmmart.apps.mn-kp01.vimpelcom.ru/api';

const PROD_API = '/eafdmmart-backend';

export const API_URL = IS_DEV ? DEV_API : PROD_API;
