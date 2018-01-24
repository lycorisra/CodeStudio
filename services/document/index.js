var fs = require('fs');
var path = require('path');
var config = require('../../configs/default.js');
var { stats, readdir, readfile, writefile, getfilename } = require('../utils.js');

var _directory = config.basePath;

module.exports = {
    readdoc: function (file) {
        return readfile(file).then((data) => {
            var json = {
                status: true,
                content: data
            }
            return Promise.resolve(json);
        }).catch(error => {
            var json = {
                status: false,
                msg: error.message
            }
            return Promise.resolve(json);
        })
    },
    savedoc: (name, content) => {
        return writefile(name, content).then(data => {
            return Promise.resolve(data);
        })
    }
}