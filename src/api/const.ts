const IS_DEV = process.env.NODE_ENV !== 'production';

const GATEWAY_LINK = 'https://fdm-gateway-func-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api-gateway/';
const GATEWAY_PRODUCT_LINK =
    'https://fdm-gateway-func-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/product/api/';
const GATEWAY_ARCH_GRAPH_LINK =
    'https://fdm-gateway-func-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/arch-graph/api/';
const GATEWAY_CAPABILITY_LINK =
    'https://fdm-gateway-func-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/capability/api/';
const MONOLITH_LINK = 'https://eafdmmart-backend-func-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/';
const STRUCTURIZR_LINK =
    'https://fdm-gateway-func-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/structurizr-backend/';
const GATEWAY_GRAPH_VALIDATOR_LINK =
    'https://fdm-gateway-func-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/graph-validator/api/';

const PROD_GATEWAY = '/api-gateway/';
const PROD_GATEWAY_PRODUCT = '/product/api/';
const PROD_GATEWAY_ARCH_GRAPH = '/arch-graph/api/';
const PROD_GATEWAY_CAPABILITY = '/capability/api/';
const PROD_STRUCTURIZR = '/structurizr-backend/';
const PROD_MONOLITH = '/api/';
const PROD_GATEWAY_GRAPH_VALIDATOR = '/graph-validator/api/';

export const API_URL = IS_DEV ? MONOLITH_LINK : PROD_MONOLITH;
export const STRUCTURIZR_URL = IS_DEV ? STRUCTURIZR_LINK : PROD_STRUCTURIZR;
export const GATEWAY_URL = IS_DEV ? GATEWAY_LINK : PROD_GATEWAY;
export const GATEWAY_PRODUCT_URL = IS_DEV ? GATEWAY_PRODUCT_LINK : PROD_GATEWAY_PRODUCT;
export const GATEWAY_ARCH_GRAPH_URL = IS_DEV ? GATEWAY_ARCH_GRAPH_LINK : PROD_GATEWAY_ARCH_GRAPH;
export const GATEWAY_CAPABILITY_URL = IS_DEV ? GATEWAY_CAPABILITY_LINK : PROD_GATEWAY_CAPABILITY;
export const GATEWAY_GRAPH_VALIDATOR_URL = IS_DEV
    ? GATEWAY_GRAPH_VALIDATOR_LINK
    : PROD_GATEWAY_GRAPH_VALIDATOR;

export const MOCK_PRODUCT_ID = 1;
