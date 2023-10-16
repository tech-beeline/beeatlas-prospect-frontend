const IS_DEV = process.env.NODE_ENV !== 'production';

const DEV_API = 'https://eafdmmart-backend-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/';

const PROD_API = '/api/';

export const API_URL = IS_DEV ? DEV_API : PROD_API;
