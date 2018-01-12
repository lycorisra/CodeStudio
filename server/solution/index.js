var fs = require('fs');
var path = require('path');

var files = [];
var tree = {};
var _directory = 'F:\webfrontend\CodeStudio';

/**
 * 获取目录stat信息
 * @param {*} dir 
 */
function stat(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if (err) {
                reject(err);
            }
            resolve(stat);
        });
    });
}
/**
 * 读取文件内容
 * @param {*} file 
 */
function readfile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (error, data) => {
            error && reject(error);

            resolve(data);
        })
    })
};
/**
 * 读取目录结构
 * @param {*} dir 
 */
function readdir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });
}
/**
 * 列出目录结构
 * @param {*} dir 
 */
function lsdir(dir, parent, level) {
    return stat(dir).then(stat => {
        var node = readdirinfo(dir, level, _directory);
        parent.children.push(node);

        if (stat.isDirectory()) {
            return readdir(dir).then(list => {
                Promise.all(list.map(item => {
                    lsdir(path.resolve(dir, item), node, parent.level + 1);
                }))
            }).then(subtree => [].concat(...subtree));
        }
        else {
            return new Promise((resolve, reject) => {
                node.icon = dir.split('.')[1];
                resolve(node);
            })
        }
    });
}
function readdirinfo(dir, parent, level, absolute_path) {
    dir = dir.replace(/\\/g, '/');
    var filename = dir.replace(absolute_path, '');

    var node = createnode(dir, level, absolute_path);

    return node;
}
function createnode(path, level, absolute_path) {
    path = path.replace(/\\/g, '/');
    var filename = path.replace(absolute_path, '');
    var node = {
        title: filename,
        level: level,
        path: path,
        icon: 'directory',

        expand: false,
        disabled: false,
        disableCheckbox: true,
        selected: false,

        children: []
    }

    return node;
}
function readFilesSync(directory, node, level) {
    var _files = fs.readdirSync(directory);

    _files.forEach(function (filename, a, b) {
        var fullfile = path.join(directory, filename).replace(/\\/g, '/');
        var items = fullfile.split('.');
        var stat = fs.statSync(fullfile);

        var item = {
            title: filename,
            level: level,
            path: fullfile.replace(directory, ''),
            icon: items[1] || 'directory',

            expand: false,
            disabled: false,
            disableCheckbox: true,
            selected: false,

            children: []
        }
        node.children.push(item);

        if (stat.isFile()) {
            files.push(fullfile.replace(/\\/g, '/'));
        }
        else if (stat.isDirectory()) {
            readFilesSync(path.join(directory, filename), item, level + 1);
        }
    });
};

module.exports = {
    read: function (dir) {
        var node = createnode(dir, 1, _directory);

        lsdir(dir, node).then(tree => {

            console.log(tree);
        });
        // return new Promise((resolve, reject) => {
        //     lsdir(dir, node);

        //     resolve(node);
        // });

    },
    save: (file, content) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, content, (error) => {
                error && reject(error);

                resolve(file);
            })
        })
    }
}
// module.exports.tree = () => {
//     return tree;
// }