// @TODO: Заменить на переменные окружения
export const isFunc = window.location.href.includes('eafdmmart-func');

export const isDev = process.env.NODE_ENV === 'development';

export const FUNC_MOCK_AUTH_LINK = 'https://eafdmmart-test-k8s-wiremock.apps.mn-kp01.vimpelcom.ru';

export const FUNC_MOCK_CONFLUENCE_LINK =
    'https://eafdmmart-test-k8s-wiremock.apps.mn-kp01.vimpelcom.ru/pages/viewpage.action?pageId=1';

export const LOCALHOST_LINK = 'http://localhost:3000';
