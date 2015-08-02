'use strict';
var request = require('request');
var TelegramBot = require('node-telegram-bot-api');

var self = this;
var cfg = null;
var token = null;
var catcatBot;

module.exports = function (_cfg, _token) {
  cfg = _cfg;
  token = _token;
  catcatBot = new TelegramBot(token, {polling: false});
  return self;
};

exports.hello = function (req, res, next) {
  return res.send('This is @catcat_bot api server. Please find us in telegram. v003');
};

exports.catcat_bot = function (req, res, next) {
  try {
    var message = req.body.message;
    if (!message || !message.text) {
      console.log(req.body);
      return res.send();
    }
    //var updateId = req.body.update_id;
    //log.verbose(updateId);
    var chatId = message.chat.id;
    if (message.text.toLowerCase().indexOf('/about') === 0) {
      catcatBot.sendMessage(chatId, 'Type /cat to see cats photos :)\n' +
        'Suggestions and Feedback: storebot.me/bot/catcat_bot \n' +
        'Rate telegram.me/storebot?start=catcat_bot \n' +
        'Yours, @catcat_bot', {disable_web_page_preview: true});
      return res.send();
    }
    if (message.text.toLowerCase().indexOf('/cat') !== 0) {
      return res.send();
    }

    var page = Math.floor(Math.random() * 999);
    var sorts = ["votes_count", "rating", "times_viewed", "favorites_count", "comments_count"];
    var sort = sorts[Math.floor(Math.random() * sorts.length)];
    var catUrl = "https://api.500px.com/v1/photos/search?consumer_key=VbiGx68xIs98oeeSCfWMVqOHmC4K45OBxwgaakMn&tag=cat&rpp=1&sort=" + sort + "&image_size=4&page=" + page;
    request.get(catUrl, function (err, response) {
      catcatBot.sendMessage(chatId, JSON.parse(response.body).photos[0].image_url);
      request.get(JSON.parse(response.body).photos[0].image_url, function (errPhoto, responsePhoto, bodyPhoto) {
        catcatBot.sendPhoto(chatId, bodyPhoto, {caption: "body"});//, {caption: "I'm a bot!"});
      });
      catcatBot.sendPhoto(chatId, request.get(JSON.parse(response.body).photos[0].image_url).pipe, {caption: "pipe"});
    });

  } catch (exception) {
    log.error(exception);
  }
  return res.send();
};
