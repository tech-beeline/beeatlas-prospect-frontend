const IS_DEV = process.env.NODE_ENV !== 'production';

const GATEWAY_LINK = window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND
    ? window.FEATURE_FLAGS.FLAG_API_URL
    : 'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api-gateway/';
const GATEWAY_PRODUCT_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/product/api/';
const GATEWAY_ARCH_GRAPH_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/arch-graph/api/';
const GATEWAY_CAPABILITY_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/capability/api/';
const MONOLITH_LINK = 'https://eafdmmart-backend-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/api/';
const STRUCTURIZR_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/structurizr-backend/';
const GATEWAY_GRAPH_VALIDATOR_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/graph-validator/api/';
const GATEWAY_CX_LINK = 'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/cx/api/';
const GATEWAY_CAMUNDA_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/camunda/';
const GATEWAY_AMBASSADOR_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/ambassador/';
const GATEWAY_OBS_DASHBOARD_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/obs-dashboard/api/';
const GATEWAY_SEQUENCE_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/sequence-backend/sequence/';
const GATEWAY_STAGING_SEQUENCE_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/staging-sequence/';
const GATEWAY_DASHBOARD_SERVICE_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/dashboard-service/';
const GATEWAY_USER_LINK =
    'https://fdm-gateway-dev-eafdmmart.apps.yd-m6-kt22.vimpelcom.ru/user/api/';

const PROD_GATEWAY = '/api-gateway/';
const PROD_GATEWAY_PRODUCT = '/product/api/';
const PROD_GATEWAY_ARCH_GRAPH = '/arch-graph/api/';
const PROD_GATEWAY_CAPABILITY = '/capability/api/';
const PROD_STRUCTURIZR = '/structurizr-backend/';
const PROD_MONOLITH = '/api/';
const PROD_GATEWAY_GRAPH_VALIDATOR = '/graph-validator/api/';
const PROD_GATEWAY_CX = '/cx/api/';
const PROD_GATEWAY_CAMUNDA = '/camunda/';
const PROD_GATEWAY_AMBASSADOR = '/ambassador/';
const PROD_OBS_DASHBOARD = '/obs-dashboard/api/';
const PROD_GATEWAY_SEQUENCE = '/sequence-backend/sequence/';
const PROD_GATEWAY_STAGING_SEQUENCE = '/staging-sequence/';
const PROD_GATEWAY_DASHBOARD_SERVICE = '/dashboard-service/';
const PROD_GATEWAY_USER = '/user/api/';

export const API_URL = IS_DEV ? MONOLITH_LINK : PROD_MONOLITH;
export const STRUCTURIZR_URL = IS_DEV ? STRUCTURIZR_LINK : PROD_STRUCTURIZR;
export const GATEWAY_URL = IS_DEV ? GATEWAY_LINK : PROD_GATEWAY;
export const GATEWAY_PRODUCT_URL = IS_DEV ? GATEWAY_PRODUCT_LINK : PROD_GATEWAY_PRODUCT;
export const GATEWAY_ARCH_GRAPH_URL = IS_DEV ? GATEWAY_ARCH_GRAPH_LINK : PROD_GATEWAY_ARCH_GRAPH;
export const GATEWAY_CAPABILITY_URL = IS_DEV ? GATEWAY_CAPABILITY_LINK : PROD_GATEWAY_CAPABILITY;
export const GATEWAY_GRAPH_VALIDATOR_URL = IS_DEV
    ? GATEWAY_GRAPH_VALIDATOR_LINK
    : PROD_GATEWAY_GRAPH_VALIDATOR;
export const GATEWAY_CX_URL = IS_DEV ? GATEWAY_CX_LINK : PROD_GATEWAY_CX;
export const GATEWAY_CAMUNDA_URL = IS_DEV ? GATEWAY_CAMUNDA_LINK : PROD_GATEWAY_CAMUNDA;
export const GATEWAY_AMBASSADOR_URL = IS_DEV ? GATEWAY_AMBASSADOR_LINK : PROD_GATEWAY_AMBASSADOR;
export const GATEWAY_OBS_DASHBOARD_URL = IS_DEV ? GATEWAY_OBS_DASHBOARD_LINK : PROD_OBS_DASHBOARD;
export const GATEWAY_SEQUENCE_DIAGRAM_URL = IS_DEV ? GATEWAY_SEQUENCE_LINK : PROD_GATEWAY_SEQUENCE;
export const GATEWAY_STAGING_SEQUENCE_URL = IS_DEV
    ? GATEWAY_STAGING_SEQUENCE_LINK
    : PROD_GATEWAY_STAGING_SEQUENCE;
export const GATEWAY_DASHBOARD_SERVICE_URL = IS_DEV
    ? GATEWAY_DASHBOARD_SERVICE_LINK
    : PROD_GATEWAY_DASHBOARD_SERVICE;
export const GATEWAY_USER_URL = IS_DEV ? GATEWAY_USER_LINK : PROD_GATEWAY_USER;

export const MOCK_PRODUCT_ID = 1;
