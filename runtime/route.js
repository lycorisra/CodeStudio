
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var http = require('http');
var config = require('../configs/default.js');
var host = config.host;

/**
 * 从webpack本地服务器中请求页面
 * @param {*} name 
 * @param {*} params 
 */
function view(name, params) {
    return function (req, res, next) {
        if (params == null) {
            params = {};
        }
        var filename = '/views/' + name + '.ejs'
        http.get(host + filename, function (response) {
            var html = '';
            response.on('data', function (data) {
                html += data;
            });
            response.on('end', function (data) {
                var fullname = path.join(__dirname, '../' + filename);
                var body = ejs.compile(html, { filename: fullname })(params);
                res.status(200).send(body)
            })
        })
    }
};

/**
 * 控制器指向控制文件
 * @param src 控制器文件路径:控制器方法
 * @return callback
 */
function control(src) {
    var items = src.split(':');
    var control = require('../controls/' + items[0])[items[1]];

    var callback = function (req, res, next) {

        res.view = function (viewname, params) {
            var fn = view(viewname, params);
            fn(req, res, next);
        };
        control(req, res, next);
    };

    return callback;
};

/**
 * 路由加载文件
 */
module.exports.load = function (app) {
    // 载入路由
    var routes = fs.readdirSync(path.join(__dirname, '../routes'));

    routes.forEach(function (name) {
        var route = '../routes/' + name;
        require(route)(app, control, view);
    });
}
