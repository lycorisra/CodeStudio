const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            hash: true,
            template: 'html-loader!views/tryit.ejs',
            filename: 'views/tryit.ejs',
        })
    ]
}
