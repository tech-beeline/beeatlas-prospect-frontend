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
    // https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    optimization: {
        minimize: false,
        // minimizer: [new TerserPlugin()],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            // cacheGroups: {
            //     vendor: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name(module) {
            //             const packageName = module.context.match(
            //                 /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            //             )[1];

            //             return `npm.${packageName.replace('@', '')}`;
            //         },
            //     },
            // },
        },
        removeAvailableModules: true,
    },
});
