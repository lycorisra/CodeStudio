const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const url = require('url')

const publicPath = '../public/'
const rootPath = __dirname.replace('build', ''); // 得到根目录，这种方式有漏洞

var config = require('./default');
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
var templates = {
    tool: {
        template: 'html-loader!views/tools/tryit.ejs',
        filename: path.resolve(__dirname, '../views/tools/tryit.ejs')
    }
};

module.exports = (page, options = {}) => {

    const key = page.name;
    const configName = options.config || config.env || 'develop';
    if (configName && configName != 'default') {
        var rewriteConfigSrc = './_' + configName;
        var rewriteConfig = require(rewriteConfigSrc);

        for (var name in rewriteConfig) {
            config[name] = rewriteConfig[name];
        }
    }
    if (configName == 'develop') {
        config.output.path = '/';
    }
    var opt = {
        entry: page.entry,
        output: Object.assign({}, config.output, { chunkFilename: key + '/js/[id].design.component.js' }),
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
            }
        },
        devtool: config.devtool || 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: 'css-loader',
                            options: {
                                url: true,
                                root: path.resolve(rootPath, 'public')
                            }
                        }]
                    })
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.json/,
                    loader: 'json-loader'
                },
                {
                    test: /favicon\.png$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 500,
                                name: key + '/images/[hash:8].[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                'views': path.resolve(__dirname, publicPath + 'views'),
                'tools': path.resolve(__dirname, publicPath + 'tools')
            }
        },
        resolveLoader: {
            alias: {
                'text': 'raw-loader',
                'css': 'style-loader'
            },
        },
        plugins: [
            // 因为这里会删除整个dist文件夹，使得dist权限被重置，导致打包失败，所以暂时不要清空内容
            // new CleanWebpackPlugin(['dist'], {
            //     // 设置根目录
            //     root: __dirname.replace('build', 'public'),
            //     verbose: true, // 开启在控制台输出信息
            //     dry: false,     // 启用删除文件
            //     exclude: [ 'lib.js','lib.min.js' ],
            // }),

            new webpack.BannerPlugin('bundled at ' + new Date().toLocaleString()),
            new HtmlResourceWebpackPlugin({ publicPath: config.output.publicPath }),
            new ExtractTextPlugin({
                filename: (getPath) => {
                    var filename = getPath(key + '/css/[name].css').replace('/' + key + '/js/', '/');
                    return filename;
                },
                allChunks: true
            }),
            new webpack.HashedModuleIdsPlugin(),
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                DEBUG: Boolean(options.dev),
                VERSION: '1.0.0',
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    };
    if (templates[key]) {
        var filename = templates[key].filename;
        filename = configName == 'develop' ? filename.substr(filename.indexOf('views')).replace(/\\/ig, '/') : filename;
        console.log('key', filename)
        opt.plugins.push(new HtmlWebpackPlugin({
            inject: 'body', // bundle.js必须放在body后面，否则无法挂载Vue实例
            minify: false,
            hash: true,
            template: templates[key].template,
            filename: filename
        }))
    };
    return opt;
}


function HtmlResourceWebpackPlugin(options) {
    this.publicPath = options.publicPath;
}

HtmlResourceWebpackPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            var html = htmlPluginData.html,
                index = html.indexOf('</head>'),
                header = html.substr(0, index);

            var linkReg = /<link\s+.*\s?(href=\"?\/?(dist)?(http:\/\/)?(dist)?(test-)?(static\.egpic\.cn)?\/.*\/css\/.*\"?).*>/ig;
            var scriptReg = /<script\s+.*\s?(src=\"?\/?(dist)?(http:\/\/)?(test-)?(static\.egpic\.cn)?\/.*\/js\/.*\"?).*><\/script>/ig;

            header = header.replace(scriptReg, '');
            header = header.replace(linkReg, '');
            html = header + html.substr(index);

            htmlPluginData.html = html;
            callback(null, htmlPluginData);
        });
    });

};
