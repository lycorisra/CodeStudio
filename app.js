/**
 * Main Application File for Dillinger.
 */

'use strict'

var cfg = require('./config'),
    config = cfg.config(),
    express = require('express'),
    app = express(),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    path = require('path'),
    routes = require('./src/routes');

app.set('port', process.env.PORT || 8088)
app.set('bind-address', process.env.BIND_ADDRESS || 'localhost')

app.set('views', __dirname + '/views');
// app.set('views', __dirname + '/res/dillinger/views');
app.set('view engine', 'ejs');
// app.set('view engine', 'html');
// app.engine('html',require('ejs').renderFile);

// May not need to use serveStatic if using nginx for serving
// static assets. Just comment it out below.
app.use(serveStatic(__dirname + '/src'));
console.log(config);
app.locals.title = config.title || 'Dillinger.'
app.locals.description = config.description || 'Dillinger, the last Markdown Editor, ever.'

if (config.googleWebmasterMeta) {
	app.locals.googleWebmasterMeta = config.googleWebmasterMeta
}
if (config.keywords) {
	app.locals.keywords = config.keywords
}
if (config.author) {
	app.locals.author = config.author
}
app.locals.node_version = process.version.replace('v', '')
app.locals.app_version = require('./package.json').version
app.locals.env = process.env.NODE_ENV

// At startup time so sync is ok.
app.locals.readme = fs.readFileSync(path.resolve(__dirname, './README.md'), 'utf-8')


app.get('/', routes.index);
// app.get('/dillinger', routes.dillinger);
app.get('/dillinger', function (req, res) {
	var view = './dillinger/index';
	var indexConfig = {
        isDropboxAuth: false,
        isGithubAuth: false,
        isEvernoteAuth: false,
        isGoogleDriveAuth: false,
        isOneDriveAuth: false,
        isDropboxConfigured: false,
        isGithubConfigured: false,
        isGoogleDriveConfigured: false,
        isOneDriveConfigured: false
	};
	return res.render(view, indexConfig);
});
app.get('/tryit', function (req, res) {
	var view = 'tryit';
	return res.render(view, {});
});

var port = 8088;
app.listen(port, function () {
    console.log('Express server listening on port ' + port)
    console.log('\nhttp://' + app.get('bind-address') + ':' + port + '\n')
})
