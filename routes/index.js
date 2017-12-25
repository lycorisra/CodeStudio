var path = require('path');

var routes = {
    index: function (req, res) {
        return res.render('tools/tryit2', {});
    },
    // Show the home page
    dillinger: function (req, res) {
        var view = './dillinger/index',
            config = {
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
        return res.render(view, config);
    },
    tryit: function (req, res) {
        return res.render('tools/tryit', {});
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