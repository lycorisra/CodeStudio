var path = require('path'),
    request = require('request'),
    qs = require('querystring');
    
exports.index = function(req, res){
  return res.render('index', {});
};

// Show the home page
exports.dillinger = function(req, res) {
  // var indexConfig = {
  //   isDropboxAuth: !!req.session.isDropboxSynced,
  //   isGithubAuth: !!req.session.isGithubSynced,
  //   isEvernoteAuth: !!req.session.isEvernoteSynced,
  //   isGoogleDriveAuth: !!req.session.isGoogleDriveSynced,
  //   isOneDriveAuth: !!req.session.isOneDriveSynced,
  //   isDropboxConfigured: Dropbox.isConfigured,
  //   isGithubConfigured: Github.isConfigured,
  //   isGoogleDriveConfigured: GoogleDrive.isConfigured,
  //   isOneDriveConfigured: OneDrive.isConfigured
  // };
  // var config = require('../config');
  var view ='./dillinger/index';
  return res.render(view, config);
}

// Show the not implemented yet page
exports.not_implemented = function(req, res) {
  res.render('not-implemented')
}

