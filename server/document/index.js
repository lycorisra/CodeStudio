var fs = require('fs');
var path = require('path');
var utils = require('../utils.js');
var { stats, readdir, readfile, writefile, getfilename } = utils;

var _directory = 'F:/webfrontend/CodeStudio';

module.exports = {
    readdoc: function (file) {
        return readfile(file).then((data) => {
            return Promise.resolve(JSON.stringify(data));
        })

    },
    savedoc: (dir) => {
        var node = createnode(dir, 1, _directory);

        lsdir(dir, node).then(tree => {
            var _path = path.resolve(__dirname, '../../public/data');
            writefile(path.join(_path, 'CodeStudio.json'), JSON.stringify(tree));
        });
    }
}