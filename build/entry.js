/**
 * 这个文件用来配置多页面应用中，每一个主页面所引用的第三方库文件。根据不同主页面，这些第三方库文件将打包到不同的vendor.js文件中
 */
const vendor = {
    lib: [
        'js/lib/jquery.js',
        'js/lib/ejs.js',
        'js/lib/ejs2.js',
        'js/lib/require.js', // 用webpack打包后，页面可以不需要require.js，但是依然可以使用require.js的语法书写代码
    ],
    design2: [
        'js/lib/jquery-ui.min.js', // 这个文件必须放在jQuery插件前面，否则，打包完成后会导致jQuery相关的插件无法使用
        'js/lib/md5.min.js',
        // 'js/lib/html2canvas.js',
        'js/lib/rgbcolor.js',
        'js/lib/StackBlur.js',
        'js/lib/canvg.min.js',
        'js/lib/glfx.js',
        'js/lib/qrcode.js',
        'js/lib/qrcode2.js',
        'js/lib/fontfaceobserver.js',

        // 非模块化的业务js文件暂时放在这里配置，以下文件将会打包进vendor.js文件中
        'views/design-v2/left-coms/background/colorp.js',
        'views/design-v2/header-coms/color/jscolor.js'
    ]
}

module.exports = [
    {
        name: 'tool',
        entry: {
            'tool/tryit': 'tools/tryit'
        }
    }
]