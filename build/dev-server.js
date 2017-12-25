
var path = require('path')
var http = require('http');
var ejs = require('ejs');
var express = require('express')
var webpack = require("webpack");
const WebpackDevMiddleware = require("webpack-dev-middleware");
var WebpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('../webpack.config')
var _config = require('../cores/config');
var configs = webpackConfig();

var compiler = webpack(configs);

var port = 3005;
// var app = require('../cores/app');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

//region express+配置项
var config = require('../cores/config');
var session = require('../cores/session');
var routeLoad = require('../cores/route');
var errorHandler = require('../cores/error');
var except = require('../classes/exception');

require('../cores/log');
// 打印环境日志
if (config.env_output_profile_to_console) {
    console.log('> run app');
    console.log('> config');
    console.log(config);
}

var app = express();
// gzip设置
if (config.env_gzip) {
    app.use(compression());
}
// 配置robots.txt爬虫屏蔽文件，非正式环境一律禁止爬取，正式环境默认不屏蔽，可以自己在robots.txt中配置
app.get('/robots.txt', function (req, res, next) {
    if (config.env == 'production') {
        next();
    }
    else {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    }
});
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb', type: 'application/x-www-form-urlencoded' }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// session
if (config.session_switch) {
    app.use(session.getConf());
    app.use(session.check());
}

var host = 'http://localhost:' + port;
// app.get('/', function (req, res, next) {
//     var url = host + '/views/home.ejs';
//     rendView(url, req, res, next);
// });
// app.get('/templates', function (req, res, next) {
//     var url = host + '/views/templates2.ejs';
//     rendView(url, req, res, next);
// });
app.get('/design', function (req, res, next) {
    var url = host + '/views/design-v2.ejs';
    rendView(url, req, res, next);
});

// 载入路由
routeLoad(app);
// 这一句代码会导致请求ejs文件时出现404错误
// app.use(function (req, res, next) {
//     next(new except.Page404Error());
// });

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(errorHandler);




app.disable('x-powered-by');
app.set('port', port);

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
            // res.render(html, { _config: {} });

            var body = ejs.compile(html, {
                filename: path.join(__dirname, '../views/design3.ejs')
            })({ _config: { global: _config.global } });
            // var body = ejs.render(html);
            res.status(200).send(body)
        })
    })
}; 