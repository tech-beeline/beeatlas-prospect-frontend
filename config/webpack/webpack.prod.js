const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.common');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/templates',
                    to: 'templates',
                },
                {
                    from: 'public/docs',
                    to: 'docs',
                },
                {
                    from: 'public/env',
                    to: 'env',
                },
            ],
        }),
    ],
    optimization: {
        minimize: false,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
        },
        removeAvailableModules: true,
    },
});
