const path = require('path')

module.exports = {
    devtool: 'inline-source-map',
    // publicPath: 'http://test-static.egpic.cn/',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    ali_oss: {
        region: 'oss-cn-beijing',
        bucket: 'test-yitustaticprod',
        accessKeyId: 'LTAI03NjybgNVELh',
        accessKeySecret: 'pMg61Fp5PFGFoViWArAdqmfxtgcQ2E',
        host: 'test-yitustaticprod.oss-cn-beijing.aliyuncs.com'
    }
}
