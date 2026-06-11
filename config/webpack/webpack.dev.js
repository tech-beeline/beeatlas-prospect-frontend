const webpack = require('webpack');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const APP_PORT = 3000;

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
            stats: 'minimal',
        },
        client: {
            logging: 'info',
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        proxy: {
            '/api/v1/auth': {
                target: 'https://eauth-dev.ess-test.vimpelcom.ru',
                changeOrigin: true,
                logLevel: 'debug',
                https: true,
                secure: false,
            },
        },
    },
    devtool: 'source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
