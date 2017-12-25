const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

    devtool: 'inline-source-map',
    // publicPath: 'http://test-static.egpic.cn/',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            hash: true,
            template: 'html-loader!views/design-v2.ejs',
            filename: 'views/design-v2.ejs',
        })
    ],
    // devServer: {
    //     port: 3005,
    //     devtool: 'inline-source-map',
    //     proxy: {
    //         "**": "http://localhost:3005"
    //     }
    // }
}
