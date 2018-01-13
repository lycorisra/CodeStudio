var fs = require('fs');
var path = require('path');

var files = [];
var tree = {};
var directory = 'F:\webfrontend\CodeStudio';

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
            expand: false,
            path: fullfile.replace(directory, ''),
            icon: items[1] || 'directory',
            children: []
        }
        node.children.push(item);

        if (stat.isFile()) {
            files.push(fullfile.replace(/\\/g, '/')); // 路径格式转化为“xxx/xxx”，否则上传到阿里云后不识别
        }
        else if (stat.isDirectory()) {
            readFilesSync(path.join(directory, filename), item, level + 1);
        }
    });
};


module.exports.readProject = (directory) => {
    var level = 1;
    var root = {
        title: 'root',
        level: level,
        path: '/',
        icon: 'directory',
        children: []
    };
    readFilesSync(directory, root, level);

    tree = root;
}
module.exports.tree = () => {
    return tree;
}
module.exports.writeFile = (filename) => {
    var json = JSON.stringify(tree);
    fs.writeFile(filename, json, (error) => {
        if (error) {
            throw error;
        }
        console.log('写入文件成功')
    })
}