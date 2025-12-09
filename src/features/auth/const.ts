import VKITAuth from '@beeline/lk-auth';

import {
    DEV_AUTH_LINK,
    FUNC_MOCK_AUTH_LINK,
    LOCALHOST_LINK,
    PROD_AUTH_LINK,
    TEST_AUTH_LINK,
} from 'utils/const';

const hostnameToAuthMap: Record<string, string> = {
    'eafdmmart-prod.apps.yd-k03.vimpelcom.ru': PROD_AUTH_LINK,
    'beeatlas.vimpelcom.ru': PROD_AUTH_LINK,
    'techradar.vimpelcom.ru': PROD_AUTH_LINK,
    'tr.vimpelcom.ru': PROD_AUTH_LINK,
    'eafdmmart-dev.apps.yd-m6-kt22.vimpelcom.ru': DEV_AUTH_LINK,
    'eafdmmart-e2e.apps.yd-m6-kt22.vimpelcom.ru': TEST_AUTH_LINK,
    'eafdmmart-func.apps.yd-m6-kt22.vimpelcom.ru': FUNC_MOCK_AUTH_LINK,
};

export const authInstance = new VKITAuth({
    authUrl: hostnameToAuthMap[window.location.hostname] ?? LOCALHOST_LINK,
});

export const AUTHENTIK_CLIENT_ID = 'fbjYx7FXGVejXrgd6md8VFI4Ip227D7PLTyZSaQh';
