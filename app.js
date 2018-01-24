'use strict'

var app = require('../runtime/app.js');
var config = require('./configs/default');
var port = config.port;

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('\nhttp://' + app.get('bind-address') + ':' + port + '\n');
});
