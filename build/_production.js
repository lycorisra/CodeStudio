const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'nosources-source-map',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        filename:'[name].min.js',
        publicPath: 'http://cdn.cn/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            hash: true,
            template: 'html-loader!views/tryit.ejs',
            filename: path.resolve(__dirname, '../views/tryit.ejs')
        })
    ]
}
