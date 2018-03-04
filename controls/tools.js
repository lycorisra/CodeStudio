var fs = require('fs');
var path = require('path');
var config = require('../configs/default.js');

module.exports = {
    result: (req, res) => {
        var code = req.body.code || '';
        code = decodeURI(code);
        code = code.replace(/\w3scrw3ipttag/gi, "script");
        code = code.replace(/\w3equalsign/gi, "=");
        code = code.replace(/\w3plussign/gi, "+");

        res.write(code);
        res.end();
    }
}