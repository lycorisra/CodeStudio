'use strict';

var fs = require('fs'),
    path = require('path');

var fileSystem = {
    readdir: function (dir, filter) {
        //var 
    },
    getFiles: function (dir, filter) {
        var self = this,
            array = [];

        var files = fs.readdirSync(dir);

        files.forEach(function (file) {
            var filePath = path.normalize(__dirname + dir + file);
            fs.stat(filePath, function (err, stat) {
                if (stat.isFile()) {
                    array.push({ name: file, path: filePath });
                }
                else if (stat.isDirectory()) {
                    self.getFiles(path.join(dir, file));
                }
            })
        });
        if (filter) {
            var list = [];
            files.forEach(function (item) {
                if (item.name.indexOf(filter) > 0) {
                    list.push(item);
                }
            });
            array = list;
        }
        return array;
    },
    writeFile: function (file, content, fininsh, error) {
        var stream = fs.createWriteStream(file, { flags: 'w', encoding: 'utf8', mode: '0666' });
        stream.on('fininsh', function () {
            fininsh && fininsh();
        });
        stream.on('error', function (error) {
            error && error(error);
            //console.log('write file error - %s',error.message)
        });
        stream.writeFile(content, 'utf8', function () {
        });
        stream.end();
    }
};
//module.exports = fileSystem;
exports.readFile = function (req, res) {
    var filename = req.query.doc;
    fs.exists(filename, function (exists) {
        if (exists) {
            fs.readFile(filename, { flag: 'r+', encoding: 'utf-8' }, function (err, data) {
                if (!err) {
                    res.write(data);
                    res.end();
                }
            });
        }
    });
};
exports.fetchHtml = function (req, res) {
    var unmd = req.body.unmd,
        json_response = {
            data: '',
            error: false
        },
        md = require('./src/res/dillinger/js/plugins/core/markdown-it.js').md;
    var _getFullHtml = function (name, str, style) {
        var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + name + '</title><style>' + ((style) ? style : '');
        html += '</style></head><body id="preview">\n';
        html += md.render(str) + '\n</body></html>';
        return html;
    };

    // For formatted HTML or not...
    var format = req.body.formatting ? _getFormat() : "",
        html = _getFullHtml(req.body.name, unmd, format),
        name = req.body.name.trim() + '.html',
        filename = path.resolve(__dirname, '../../downloads/files/html/' + name);

    if (req.body.preview === 'false') {
        res.attachment(name);
    }
    else {
        res.type('html');
        res.set('Content-Disposition', 'inline; filename="${name}"');
    }

    res.end(html);
}