'use strict';

var self = this;
var api;

module.exports = function (cfg) {
  api = require('./controllers/api')(cfg);
  return self;
};

exports.routes = function (app) {
  app.get('/', api.hello);
  app.post('/bot/91219955:AAEIbiz947It9VaFEyvjelh0ni7lELYZqLc', api.catcat_bot);
};
