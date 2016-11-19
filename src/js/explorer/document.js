'use strict';

var fs = require('fs'),
    path = require('path');

/*
    1、读取文件 readFile函数 readFile(filename,[options],callback)

    filename：必选参数，文件名
    [options]：可选参数，可指定flag（文件操作选项，如r+读写；w+读写，文件不存在则创建）及encoding属性
    callback：读取文件后的回调函数，参数默认第一个为err，第二个为data数据
    例如：fs.readFile(__dirname + '/text.txt',{flag:'r+',encoding:'utf8'},function(err,data){})
*/

/*
    2、写文件 writeFile(filename,data,[options],callback)
    filename：必选参数，文件名
    data：写入的数据，可以是字符或一个Buffer对象
    [options]：可选参数，可指定flag和mode（权限）及encoding属性
    callback：写入文件后的回调函数，参数默认第一个为err，第二个为data数据
    例如：
    var data = 'hello word'; 或
    var data = new Buffer('hello word');

    fs.writeFile(__dirname + '/text.txt',data,{flag:'a',encoding:'utf8'},function(err,data){})
*/

/*
    3、追加方式写入文件 appendFile(filename,data,[options],callback)
    filename：必选参数，文件名
    data：写入的数据，可以是字符或一个Buffer对象
    [options]：可选参数，可指定flag和mode（权限）及encoding属性
    callback：写入文件后的回调函数，参数默认第一个为err，第二个为data数据
    例如：
    fs.appendFile(__dirname + '/test.txt', '使用fs.appendFile追加文件内容', function () {
        console.log('追加内容完成');
    });
*/

/*
    4、打开文件 open(filename,flags,[mode],callback)
    filename：必选参数，文件名
    flags：操作标识，如"r",读方式打开
    [mode]：权限，如777，表示任何用户读写可执行
    callback：打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
    例如：
    fs.open(__dirname + '/test.txt', 'r', '0666', function (err,fd) {
        console.log(fd);
    });
*/

/*
    5、读取文件，读取打开的文件内容到缓冲区中 read(fd,buffer,offset,length,position,callback)
    fd：使用fs.open打开成功后返回的文件描述符
    buffer：一个Buffer对象，v8引擎分配的一段内存
    offset：整数，向缓存区中写入时的初始位置，以字节为单位
    length：整数，读取文件的长度
    position：整数，读取文件初始位置；文件大小以字节为单位
    callback(err, bytesRead, buffer)：读取执行完成后回调函数，bytesRead实际读取字节数，被读取的缓存区对象
    例如：
     fs.open(__dirname + '/test.txt', 'r', function (err, fd) {
           if(err) {
               console.error(err);
               return;
           } else {
               var buffer = new Buffer(255);
               console.log(buffer.length);
               //每一个汉字utf8编码是3个字节，英文是1个字节
               fs.read(fd, buffer, 0, 9, 3, function (err, bytesRead, buffer) {
                 if(err) {
                     throw err;
                 } else {
                     console.log(bytesRead);
                     console.log(buffer.slice(0, bytesRead).toString());
                     //读取完后，再使用fd读取时，基点是基于上次读取位置计算；
                     fs.read(fd, buffer, 0, 9, null, function (err, bytesRead, buffer) {
                         console.log(bytesRead);
                         console.log(buffer.slice(0, bytesRead).toString());
                     });
                 }
             });
         }
     });
*/

/*
    6、写文件，将缓冲区内数据写入使用fs.open打开的文件 fs.write(fd, buffer, offset, length, position, callback);
    fd：使用fs.open打开成功后返回的文件描述符
    buffer：一个Buffer对象，v8引擎分配的一段内存
    offset：整数，从缓存区中读取时的初始位置，以字节为单位
    length：整数，读取文件的长度
    position：整数，写入文件初始位置；
    callback(err, bytesRead, buffer)：读取执行完成后回调函数，bytesRead实际读取字节数，被读取的缓存区对象
*/

/*
    7、刷新缓存区 使用fs.write写入文件时，操作系统是将数据读到内存，再把数据写入到文件中，当数据读完时并不代表数据已经写完，因为有一部分还可能在内在缓冲区内.因此可以使用fs.fsync方法将内存中数据写入文件；--刷新内存缓冲区；
    fd：使用fs.open打开成功后返回的文件描述符
    callback(err, written, buffer)：写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
     fs.open(__dirname + '/test.txt', 'a', function (err, fd) {
           if(err)
               throw err;
           var buffer = new Buffer('我爱nodejs编程');

           fs.write(fd, buffer, 0, 9, 0, function (err, written, buffer) {
               console.log(written.toString());
               fs.write(fd, buffer, 9, buffer.length - 9, null, function (err, written) {
                   console.log(written.toString());
                 fs.fsync(fd);
                 fs.close(fd);
             })
         });
     });
*/
; (function (undefined) {
    function FileTree(basepath) {
        this.basepath = basepath;
        this.nodes = [];
    };
    FileTree.prototype.load = function () {
        var root = {
            name: this.basepath,
            icon: 'root'
        };
        _readdir(this.basepath, root, 1);
    }
    function _readdir(dir, parent, level) {

    };
    function readdir(dir, callback) {
        var array = [];
        dir = /$/.test(dir) ? dir : dir + '/';
        (function dir(dirpath, fn) {
            var items = fs.readdirSync(dirpath);
            async(items, function (item, next) {
                var curPath = dirpath + item,
                    info = fs.statSync(curPath);

                if (info.isDirectory()) {
                    dir(curPath + '/', function () { next(); });
                }
                else {
                    array.push(curPath);
                    callback && callback(curPath);
                    next();
                }
            }, function (error) {
                !error && fn && fn();
            });
        })(dir);
        return array;
    }
    function async(array, callback, error) {
        if (Object.prototype.toString.call(array) !== '[object Array]') {
            return error(new Error('第一个参数必须为数组'));
        }
        if (array.length === 0)
            return error(null);

        (function walk(i) {
            callback(array[i], function () {
                walk(i++);
            });
            if (i >= array.length) {
                return error(null);
            }
        })(0);
    };
})();
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
    }
};
module.exports = fileSystem;