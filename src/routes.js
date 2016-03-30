'use strict';

var self = this;
var token = '91219955:AAGpDWI63GTZRLXWy7G1rmKA5NctGRRG2vQ';
var api;

module.exports = function (cfg) {
  api = require('./controllers/api')(cfg, token);
  return self;
};

exports.routes = function (app) {
  app.get('/', api.hello);
  app.post('/bot/' + token, api.catcat_bot);
};
