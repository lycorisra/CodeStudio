var fs = require('fs');
var path = require('path');
var config = require('../configs/default.js');
var { readdoc, savedoc } = require('../services/document');

module.exports = {
    read: (req, res) => {
        var _path = req.query.path,
            file = path.join(config.basePath, _path);

        readdoc(file).then(data => {
            res.json(data);
            res.end();
        });
    },
    save: (req, res) => {
        var _path = req.query.path,
            file = path.join(config.basePath, _path),
            content = decodeURIComponent(req.query.content);

        savedoc(file, content).then(data => {
            res.write(data);
            res.end();
        });
    },
    result: (req, res) => {
        var code = req.body.code || '';
        code = decodeURI(code);
        code = code.replace(/\w3scrw3ipttag/gi, "script");
        code = code.replace(/\w3equalsign/gi, "=");
        code = code.replace(/\w3plussign/gi, "+");

        res.write(code);
        res.end();
    }
}