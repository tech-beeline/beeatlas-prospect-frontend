const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const APP_PORT = 3000;

function readLocalEnv() {
    const envPath = path.join(process.env.PWD, 'public', 'env', 'env');

    if (!fs.existsSync(envPath)) {
        return {};
    }

    return Object.fromEntries(
        fs
            .readFileSync(envPath, 'utf8')
            .trim()
            .split('\n')
            .filter(Boolean)
            .map((line) => {
                const [key, ...rest] = line.split('=');

                return [key.trim(), rest.join('=').replace(/^'|'$/g, '').trim()];
            }),
    );
}

const { FLAG_EAUTH_PROXY_TARGET } = readLocalEnv();

const devServer = {
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
};

if (FLAG_EAUTH_PROXY_TARGET) {
    devServer.proxy = {
        '/api/v1/auth': {
            target: FLAG_EAUTH_PROXY_TARGET,
            changeOrigin: true,
            secure: false,
        },
    };
}

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
    devServer,
    devtool: 'source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
