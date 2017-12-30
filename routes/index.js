var path = require('path');
var http = require('http');
var ejs = require('ejs');

var host = 'http://localhost:' + 3005;

var routes = {
    index: function (req, res, next) {
        var url = host + '/views/tools/tryit.ejs';
        rendView(url, req, res, next);
    },
    tryit: function (req, res) {
        return res.render('tryit', {});
    },
    document: function (req, res) {

    },
    result_get: function (req, res) {
        res.write('');
        res.end();
    },
    result_post: function (req, res) {
        var code = req.body.code || '';
        code = decodeURI(code);
        code = code.replace(/\w3scrw3ipttag/gi, "script");
        code = code.replace(/\w3equalsign/gi, "=");
        code = code.replace(/\w3plussign/gi, "+");

        res.write(code);
        res.end();
    },
    not_implemented: function (req, res) {
        res.render('not-implemented')
    }
};
exports.initRoutes = function (app) {
    app.get('/', routes.index);
    app.get('/tryit', routes.tryit);
    app.get('/document', routes.document);
    app.get('/result', routes.result_get);
    app.post('/result', routes.result_post);
}

function rendView(url, req, res, next) {
    http.get(url, function (response) {
        var html = '';
        response.on('data', function (data) {
            html += data;
        });
        response.on('end', function (data) {
            var body = ejs.compile(html, {
                filename: path.join(__dirname, '../views/tools/tryit.ejs')
            })({});
            res.status(200).send(body)
        })
    })
}; 