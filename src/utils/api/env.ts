// const DEV_HOST = 'https://api.dev.ru/';
// const PROD_HOST = 'https://api.prod.ru/';

const DEV_PORT = '';
const PROD_PORT = '';

const IS_DEV = process.env.NODE_ENV !== 'production';

// export const HOST = IS_DEV ? DEV_HOST : PROD_HOST;
export const PORT = IS_DEV ? DEV_PORT : PROD_PORT;
