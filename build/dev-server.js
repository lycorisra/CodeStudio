var http = require('http');
var webpack = require("webpack");
const WebpackDevMiddleware = require("webpack-dev-middleware");
var WebpackHotMiddleware = require('webpack-hot-middleware');

var config = require('../configs/default');
var webpackConfig = require('../webpack.config');
var app = require('../runtime/app.js');
var configs = webpackConfig();
var compiler = webpack(configs);

var port = config.port;
app.use(WebpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: { colors: true }
}))
app.use(WebpackHotMiddleware(compiler))

var server = http.createServer(app).listen(port);

server.on('error', function (error) {
    throw error;
});
server.on('listening', function () {
    console.log('Listening on ' + port)
});