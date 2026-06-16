const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { randomUUID } = require("node:crypto");

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV !== 'development';

const lkAuthPackagePath = path.join(process.env.PWD, 'node_modules', '@beeline', 'lk-auth');
const lkAuthStubPath = path.join(
    process.env.PWD,
    'src',
    'features',
    'auth',
    'providers',
    'lk-auth-stub.ts',
);
const lkAuthAlias = fs.existsSync(path.join(lkAuthPackagePath, 'package.json'))
    ? lkAuthPackagePath
    : lkAuthStubPath;

module.exports = {
    entry: path.join(process.env.PWD, 'src', 'index.tsx'),
    output: {
        publicPath: '/',
        path: path.join(process.env.PWD, 'build'),
        filename: `[name]-${randomUUID()}.js`,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'process/browser': require.resolve('process/browser.js'),
            '@beeline/lk-auth': lkAuthAlias,
        },
        fallback: {
            process: require.resolve('process/browser.js'),
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.join(process.env.PWD, 'tsconfig.json'),
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[hash].[ext]',
                    outputPath: 'images',
                },
            },
            {
                test: /\.svg$/,
                use: [
                    '@svgr/webpack',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 30000,
                        },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.(pptx)(\?.*)?$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
        }),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].build.css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(process.env.PWD, 'public', 'index.html'),
            favicon: path.join(process.env.PWD, 'public', 'favicon.ico'),
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
                removeRedundantAttributes: isProd,
                removeScriptTypeAttributes: isProd,
                removeStyleLinkTypeAttributes: isProd,
                useShortDoctype: isProd,
            },
        }),
    ],
};
