
var path = require('path')
var http = require('http');
var ejs = require('ejs');
var express = require('express')
var webpack = require("webpack");
const WebpackDevMiddleware = require("webpack-dev-middleware");
var WebpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('../webpack.config')
var routes = require('../routes');

var configs = webpackConfig();

var compiler = webpack(configs);

var port = 3005;

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 8088);
app.set('bind-address', process.env.BIND_ADDRESS || 'localhost');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')));

function _getFullHtml(name, str, style) {
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + name + '</title><style>' + ((style) ? style : '');
    html += '</style></head><body id="preview">\n';
    return html;
}

routes.initRoutes(app);

app.get('/tryit', function (req, res) {
    return res.render(tryit, {});
});
app.get('/document', function (req, res) {
    var doc = require('./src/js/server/documents');
    doc.readFile(req, res);
});

app.use(WebpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: { colors: true }
}))
app.use(WebpackHotMiddleware(compiler))

var server = http.createServer(app);
server.listen(port);
server.on('error', function (error) {
    throw error;
});
server.on('listening', function () {
    console.log('Listening on ' + port)
});
function rendView(url, req, res, next) {
    http.get(url, function (response) {
        var html = '';
        response.on('data', function (data) {
            html += data;
        });
        response.on('end', function (data) {
            var body = ejs.compile(html, {
                filename: path.join(__dirname, '../views/design3.ejs')
            })({ });
            res.status(200).send(body)
        })
    })
}; 