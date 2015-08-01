'use strict';

var self = this;
var cfg = null;
var token = null;
var TelegramBot = require('node-telegram-bot-api');
var catcatBot = new TelegramBot(token, {polling: false});

module.exports = function (_cfg, _token) {
  cfg = _cfg;
  token = _token;
  return self;
};

exports.hello = function (req, res, next) {
  return res.send('This is @catcat_bot api server. Please find us in telegram. v002');
};

exports.catcat_bot = function (req, res, next) {
  try {
    console.log(req.body);
    var message = req.body.message;
    var updateId = req.body.update_id;
    console.log(message);
    log.verbose(updateId);
    var chatId = message.chat.id;
    var photo = cfg.rootDir + 'cats-87a.jpg';
    catcatBot.sendPhoto(chatId, photo, {caption: "I'm a bot!"});
  } catch (exception) {
    log.error(exception);
  }
  return res.send();
};
