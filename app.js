'use strict'

var cfg = require('./src/js/server/config'),
    config = cfg.config(),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    //fs = require('fs'),
    //path = require('path'),
    routes = require('./src/js/server/routes');

app.set('port', process.env.PORT || 8088);
app.set('bind-address', process.env.BIND_ADDRESS || 'localhost');

app.set('views', __dirname + '/views');
// app.set('views', __dirname + '/res/dillinger/views');
app.set('view engine', 'ejs');
// app.set('view engine', 'html');
// app.engine('html',require('ejs').renderFile);

// May not need to use serveStatic if using nginx for serving
// static assets. Just comment it out below.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(serveStatic(__dirname + '/src'));

app.locals.title = config.title || 'Dillinger.';
app.locals.description = config.description || 'Dillinger, the last Markdown Editor, ever.';

if (config.googleWebmasterMeta) {
    app.locals.googleWebmasterMeta = config.googleWebmasterMeta;
}
if (config.keywords) {
    app.locals.keywords = config.keywords;
}
if (config.author) {
    app.locals.author = config.author;
}
app.locals.node_version = process.version.replace('v', '');
app.locals.app_version = require('./package.json').version;
app.locals.env = process.env.NODE_ENV;

// At startup time so sync is ok.
//app.locals.readme = fs.readFileSync(path.resolve(__dirname, './README.md'), 'utf-8');

routes.initRoutes(app);

var port = 8088;
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('\nhttp://' + app.get('bind-address') + ':' + port + '\n');
});
