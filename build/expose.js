/**
 * 这个文件用来配置webpack打包时需要暴露出来的全局变量，主要包括第三方库文件，这些文件会打包到vendor.js文件中去，
 * 需要注意的是，这些库文件需满足CommonJS或AMD规范，否则，页面运行时会找不到定义
 */
module.exports = [
    {
        test: require.resolve('../public/js/lib/jquery.js'),
        use: [
            {
                loader: 'expose-loader',
                options: 'jQuery'
            },
            {
                loader: 'expose-loader',
                options: '$'
            }
        ]
    },
    {
        test: require.resolve('../public/js/lib/ejs.js'),
        use: [
            {
                loader: 'expose-loader',
                options: 'ejs'
            }
        ]
    }
]