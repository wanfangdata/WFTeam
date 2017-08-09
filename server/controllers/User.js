'use strict';

var url = require('url');

var User = require('./UserService');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

module.exports.getUsers = function (req, res, next) {
  var params = req.swagger.params;


};

module.exports.createUser = function createUser(req, res, next) {
  User.createUser(req.swagger.params, res, next);
};

module.exports.loginUser = function loginUser(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ userName: "hueidou", realName: null }, null, 2));
  return;
};