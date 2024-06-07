const IS_DEV = process.env.NODE_ENV !== 'production';

const GATEWAY_LINK = 'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api-gateway/';

const MONOLITH_LINK = 'https://eafdmmart-backend-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/';

const PROD_GATEWAY = '/api-gateway/';

const PROD_MONOLITH = '/api/';

export const API_URL = IS_DEV ? MONOLITH_LINK : PROD_MONOLITH;

export const GATEWAY_URL = IS_DEV ? GATEWAY_LINK : PROD_GATEWAY;

export const MOCK_PRODUCT_ID = 1;
