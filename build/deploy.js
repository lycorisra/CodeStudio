var co = require('co');
var fs = require('fs');
var path = require('path');
var oss = require('ali-oss');
var config = require('./default');

var env = process.argv.splice(2)[0] || 'test';

if (env === 'develop') {
    console.log('当前是开发环境，已中止阿里云上传...');
    return false;
}

console.log('开始上传到阿里云CDN...');

var directory = path.join(__dirname, '../public/dist');
if (env) {

    var rewriteConfigSrc = './_' + env;
    var rewriteConfig = require(rewriteConfigSrc);

    for (var name in rewriteConfig) {
        config[name] = rewriteConfig[name];
    }
}

var client = new oss({
    region: config.ali_oss.region,
    accessKeyId: config.ali_oss.accessKeyId,
    accessKeySecret: config.ali_oss.accessKeySecret
})

var files = [];
function readFilesSync(directory) {
    var _files = fs.readdirSync(directory);

    _files.forEach(function (filename, a, b) {
        var fullfile = path.join(directory, filename);
        var stat = fs.statSync(fullfile);

        if (stat.isFile()) {
            files.push(fullfile.replace(/\\/g, '/')); // 路径格式转化为“xxx/xxx”，否则上传到阿里云后不识别
        }
        else if (stat.isDirectory()) {
            readFilesSync(path.join(directory, filename));
        }
    });
};
readFilesSync(directory);

if (!files || files.length === 0) {
    return false;
}
co(function* () {
    for (var i = 0, file; file = files[i]; i++) {
        var filename = file.substr(file.indexOf('dist/') + 5);
        client.useBucket(config.ali_oss.bucket);
        var result = yield client.put(filename, file);
    }

}).then(function () {
    console.log('上传阿里云完成!');
}).catch(function (error) {
    console.log('上传阿里云出错，请运行“npm run deploy”命令重新上传!')
    throw (error);
});