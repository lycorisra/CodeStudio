const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'nosources-source-map',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        filename:'[name].min.js',
        publicPath: 'http://static.egpic.cn/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            minify: false,
            hash: true,
            template: 'html-loader!views/design-v2.ejs',
            filename: path.resolve(__dirname, '../views/design-v2.ejs')
        })
    ],
    ali_oss:{
        region:'oss-cn-beijing',
        bucket:'yitustaticprod',
        accessKeyId:'LTAI03NjybgNVELh',
        accessKeySecret:'pMg61Fp5PFGFoViWArAdqmfxtgcQ2E',
        host:'yitustaticprod.oss-cn-beijing.aliyuncs.com'
    }
}
