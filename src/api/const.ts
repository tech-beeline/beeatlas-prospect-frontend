const IS_DEV = process.env.NODE_ENV !== 'production';

const GATEWAY_LINK = 'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api-gateway/';

const MONOLITH_LINK = 'https://eafdmmart-backend-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/';

const STRUCTURIZR_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/structurizr-backend/';

const PROD_GATEWAY = '/api-gateway/';

const PROD_MONOLITH = '/api/';

const PROD_STRUCTURIZR = '/structurizr-backend/';

export const API_URL = IS_DEV ? MONOLITH_LINK : PROD_MONOLITH;

export const STRUCTURIZR_URL = IS_DEV ? STRUCTURIZR_LINK : PROD_STRUCTURIZR;

export const GATEWAY_URL = IS_DEV ? GATEWAY_LINK : PROD_GATEWAY;

export const MOCK_PRODUCT_ID = 1;
