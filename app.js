'use strict'

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    routes = require('./routes');


app.set('port', process.env.PORT || 8088);
app.set('bind-address', process.env.BIND_ADDRESS || 'localhost');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/result', function (req, res) {
    res.write('');
    res.end();
});
app.post('/result', function (req, res) {
    var code = req.body.code || '';
    code = decodeURI(code);
    code = code.replace(/\w3scrw3ipttag/gi, "script");
    code = code.replace(/\w3equalsign/gi, "=");
    code = code.replace(/\w3plussign/gi, "+");

    res.write(code);
    res.end();
});
var port = 8088;
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('\nhttp://' + app.get('bind-address') + ':' + port + '\n');
});
