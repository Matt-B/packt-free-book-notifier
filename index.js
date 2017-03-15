var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var PushBullet = require('pushbullet');
var config = require('./config.json');
var pusher = new PushBullet(config.pushbullet_api_key);

var bookTitle;

async.series([

  function getBookTitle(next) {
    request("https://www.packtpub.com/packt/offers/free-learning", function(error, response, body) {
      if(error) {
        console.log(error);
      } else {
        var $ = cheerio.load(body);
        bookTitle = $('.dotd-title h2').text().trim();
        next()
      }
    });
  },

  function pushNotification(next) {
    var deviceParams = {};
    pusher.note(deviceParams, 'Packt Free Book', 'Today\'s Free Book is ' + bookTitle, next);
  }

]);
