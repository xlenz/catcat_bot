'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cfg;

module.exports = function (app, _cfg, routes) {
  cfg = _cfg;
  app.use(logWho);
  app.use(bodyParser.json());
  routes.routes(app);
  app.use(pageNotFound);
  app.use(internalServerError);
};

function logWho(req, res, next) {
  var who = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //log.verbose(who + ' req: ' + req.headers.host + req.url);
  next();
}

function pageNotFound(req, res, next) {
  res.status(404);
  return res.send({
    error: 'NOT_FOUND',
    code: 404
  });
}

function internalServerError(err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  console.log('req.body:\n', req.body);
  return res.send({
    error: err.message,
    code: 500
  });
}
