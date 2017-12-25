/**
 * webpack打包配置文件
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    env: process.env.NODE_ENV || 'develop',

    devtool: 'inline-source-map',
    // publicPath: '/dist/',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            hash: true,
            chunks: ['index', 'common'],
            template: 'html-loader!views/home.ejs',
            filename: path.resolve(__dirname, '../views/_home.ejs')
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            hash: true,
            chunks: ['template2', 'common'],
            template: 'html-loader!views/templates2.ejs',
            filename: path.resolve(__dirname, '../views/_templates2.ejs')
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            hash: true,
            chunks: ['design2', 'common'],
            template: 'html-loader!views/design-v2.ejs',
            filename: path.resolve(__dirname, '../views/_design-v2.ejs')
        })
    ]
};