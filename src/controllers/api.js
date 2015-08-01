'use strict';

var self = this;
var cfg = null;

module.exports = function (_cfg) {
  cfg = _cfg;
  return self;
};

exports.hello = function (req, res, next) {
  return res.send('This is @catcat_bot api server. Please find us in telegram.');
};

exports.catcat_bot = function (req, res, next) {
    log.info(req.body);
    log.trace('trace');
    return res.send();
}
