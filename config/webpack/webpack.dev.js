const webpack = require('webpack');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const APP_PORT = 3003;

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        'webpack/hot/dev-server.js',
        `webpack-dev-server/client?http://localhost:${APP_PORT}`,
        './src/index.tsx',
    ],
    output: {
        publicPath: '/',
    },
    devServer: {
        https: false,
        port: APP_PORT,
        open: false,
        historyApiFallback: true,
        devMiddleware: {
            // https://webpack.js.org/configuration/experiments/#experimentslazycompilation
            // lazy: false,
            stats: 'minimal',
            // index: false,
        },
        client: {
            logging: 'info',
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        proxy: {
            '/oauth-idp': {
                target: 'http://oauth-idp2-lkb2b-test.apps.k01.vimpelcom.ru/',
                // target: 'http://dr-b2bon02.vimpelcom.ru:8082/',
                // ws: false,
                changeOrigin: true,
                pathRewrite: { '^/oauth-idp': '' },
                logLevel: 'debug' /*optional*/,
            },
        },
    },
    devtool: 'source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
