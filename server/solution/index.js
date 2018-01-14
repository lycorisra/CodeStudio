var fs = require('fs');
var path = require('path');
var utils = require('../utils.js');
var { stats, readdir, readfile, writefile, getfilename } = utils;
// import { stats, readdir, readfile, writefile } from '../utils.js';

var _directory = 'F:/webfrontend/CodeStudio';
/**
 * 列出目录结构
 * @param {*} dir 
 */
function lsdir(dir, parent) {
    return stats(dir).then(stat => {
        if (dir.indexOf('README.md') > -1) {
            console.log(stat);
        }

        if (stat.isDirectory()) {
            return readdir(dir).then(list => {
                list = list.filter((item, index) => {
                    return item !== 'node_modules' && item !== '.git';
                })
                return Promise.all(list.map(item => {
                    var _dir = path.resolve(dir, item);
                    var node = createnode(_dir, parent.level + 1, _directory);
                    return lsdir(_dir, node, parent.level + 1);
                }))
            }).then(children => {
                var array = children ? [].concat(...children) : [];
                parent.children = children;
                return parent;
                // return Promise.resolve(parent);
            });
        }
        else {
            var index = dir.lastIndexOf('.');
            parent.icon = dir.substr(index + 1);
            return parent;
        }
    })
}
function createnode(path, level, absolute_path) {
    path = path.replace(/\\/g, '/').replace(/\/\//g, '/');
    var node = {
        title: getfilename(path),
        level: level,
        path: path.replace(absolute_path, ''),
        icon: 'directory',

        expand: false,
        disabled: false,
        disableCheckbox: true,
        selected: false,

        children: []
    }

    return node;
}

module.exports = {
    read: function (dir) {


    },
    save: (dir) => {
        var node = createnode(dir, 1, _directory);

        lsdir(dir, node).then(tree => {
            var _path = path.resolve(__dirname, '../../public/data');
            writefile(path.join(_path, 'CodeStudio.json'), JSON.stringify(tree));
        });
    }
}