var fs = require('fs');
var path = require('path');

/**
 * 获取目录stat信息
 * @param {*} dir 
 */
function stats(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, info) => {
            if (err) {
                reject(err);
            }
            resolve(info);
        });
    });
}
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
 * 写入文件
 * @param {*} file 
 * @param {*} content 
 */
function writefile(file, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, (error) => {
            error && reject(error);

            resolve(file);
        })
    })
}
function getfilename(fullfile) {
    var index = fullfile.lastIndexOf('/');
    // index = index === -1 ? fullfile.lastIndexOf('/') : index;

    return fullfile.substr(index + 1);
}
var files = [];
var tree = {};
function readFilesSync(directory, node, level) {
    directory = directory.replace(/\\/g, '/');
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
module.exports = { stats, readdir, readfile, writefile, getfilename }


// var fs = require('fs');
// var path = require('path');

// function readdirPromisify(dir) {
//     return new Promise((resolve, reject) => {
//         fs.readdir(dir, (err, list) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(list);
//         });
//     });
// }

// function statPromisify(dir) {
//     return new Promise((resolve, reject) => {
//         fs.stat(dir, (err, stats) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(stats);
//         });
//     });
// }

// function listDir(dir) {
//     return statPromisify(dir).then(stats => {
//         if (stats.isDirectory()) {
//             return readdirPromisify(dir).then(list =>
//                 Promise.all(list.map(item =>
//                     listDir(path.resolve(dir, item))
//                 ))
//             ).then(subtree => [].concat(...subtree));
//         } else {
//             return [dir];
//         }
//     });
// }