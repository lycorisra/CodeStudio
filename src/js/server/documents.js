'use strict';

var fs = require('fs'),
    path = require('path');

exports.readFile = function (req, res, filename) {
    filename = filename || 'views/index.html';
    fs.readFile(filename, { flag: 'r+', encoding: 'utf8' }, function (err, data) {
        var content = err ? err : data;
        //console.log(content);
        res.write(content);
        res.end();
    })
    //return res.render('index', {});
};