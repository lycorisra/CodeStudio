const entry = require('./build/entry');
const baseConfig = require('./build/base.config');

module.exports = (options = {}) => {
    var opts = [];
    for (var i = 0; i < entry.length; i++) {
        var opt = baseConfig(entry[i], options);
        opts.push(opt);
    }
    return opts;
}
