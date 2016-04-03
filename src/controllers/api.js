'use strict';
var request = require('request');
var TelegramBot = require('node-telegram-bot-api');
var api500url = 'https://api.500px.com/v1/photos/search?consumer_key=VbiGx68xIs98oeeSCfWMVqOHmC4K45OBxwgaakMn';
var sorts = ["votes_count", "rating", "times_viewed", "favorites_count", "comments_count"];
var fs = require('fs');
var imagesFolder = 'images';

fs.exists(imagesFolder, (exists) => {
  if (!exists) fs.mkdir(imagesFolder);
});

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
  return res.send('This is @catcat_bot api server. Please find us in telegram. v004');
};

exports.catcat_bot = function (req, res, next) {
  try {
    var message = req.body.message;
    if (!message || !message.text) {
      return res.send();
    }

    var chatId = message.chat.id;
    if (message.text.toLowerCase().indexOf('/about') === 0) {
      catcatBot.sendMessage(chatId, 'Type /cat or /flower or /dog to see photos :)\n' +
        'Suggestions and Feedback: storebot.me/bot/catcat_bot \n' +
        'Rate telegram.me/storebot?start=catcat_bot \n' +
        'All photos provided by https://500px.com \n' +
        'Yours, @catcat_bot', {disable_web_page_preview: true});
      return res.send();
    }
    if (message.text.toLowerCase().indexOf('/cat') === 0) {
      sendImage(chatId, 'kitten');
    } else if (message.text.toLowerCase().indexOf('/flower') === 0) {
      sendImage(chatId, 'flower');
    } if (message.text.toLowerCase().indexOf('/dog') === 0) {
      sendImage(chatId, 'puppy');
    } else return res.send();

  } catch (exception) {
    log.error(exception);
  }
  return res.send();
};

function sendImage(chatId, tag) {
  var page = Math.floor(Math.random() * 199);
  
  var sort = sorts[Math.floor(Math.random() * sorts.length)];
  var catUrl = api500url + "&tag=" + tag + "&rpp=1&sort=" + sort + "&image_size=4&page=" + page;

  request.get(catUrl, function (err, response) {
    if (!JSON.parse(response.body).photos) return sendImage(chatId, tag);
    var photoObj = JSON.parse(response.body).photos[0];
    var imgName = imagesFolder + '/' + tag + '-' + photoObj.id + '-' + chatId + '.jpg';
    fs.exists(imgName, (exists) => {
      if (exists) imgName += Math.floor(Math.random() * 9999) + '.jpg';
      var fsStream = fs.createWriteStream(imgName);
      fsStream.on('close', function() {
        catcatBot.sendPhoto(chatId, imgName).then(function() {
          fs.unlink(imgName);
        });
      });

      request.get(photoObj.image_url).pipe(fsStream);
    });
  });
}