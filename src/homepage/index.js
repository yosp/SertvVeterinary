var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
// var request = require('superagent');
var header = require('../header');
// var axios = require('axios');

page('/', header, function (ctx, next) {
  title('Veterinaria');
  var main = document.getElementById('main-container');

  // empty(main).appendChild(template(ctx.pictures));
})