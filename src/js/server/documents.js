'use strict';

var fs = require('fs'),
    path = require('path');

exports.readFile = function (req, res) {
    var filename = req.query.doc;
    fs.exists(filename, function (exists) {
        if (exists) {
            fs.readFile(filename, { flag: 'r+', encoding: 'utf8' }, function (err, data) {
                //console.log(data);
                if (!err) {
                    res.write(data);
                    res.end();
                }
            });
        }
    });
    
    //return res.render('index', {});
};