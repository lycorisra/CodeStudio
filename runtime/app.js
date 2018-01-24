'use strict'

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    route = require('./route'),
    config = require('../configs/default');

app.set('port', process.env.PORT || config.port);
app.set('bind-address', process.env.BIND_ADDRESS || 'localhost');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')));

route.load(app);

module.exports = app;