var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var PushBullet = require('pushbullet');
var config = require('./config.json');
var pusher = new PushBullet(config.pushbullet_api_key);
var puppeteer = require('puppeteer');

var bookTitle;

async function getBookTitle() {
  var browser = await puppeteer.launch({ headless: true });
  var page = await browser.newPage();
  await page.goto('https://www.packtpub.com/packt/offers/free-learning');
  bookTitle = await page.evaluate(() => document.querySelector('.product__title').textContent);
  await browser.close();
  var deviceParams = {};
  if(bookTitle !== "" && bookTitle) {
    pusher.note(deviceParams, 'Packt Free Book', 'Today\'s Free Book is ' + bookTitle + '\n'
      + 'Get it at https://www.packtpub.com/packt/offers/free-learning');
  } else {
    pusher.note(deviceParams, 'Packt Free Book', 'Something went wrong and I couldn\'t get details of todays book.\n'
      + 'Please check the website at https://www.packtpub.com/packt/offers/free-learning');
  }
};

getBookTitle();
