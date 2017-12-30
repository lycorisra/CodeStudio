const path = require('path')

module.exports = {
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        filename: '[name].js',
        publicPath: 'dist/'
    }
}
