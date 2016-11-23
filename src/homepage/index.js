var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var appointment = require('../appointment-card')
var title = require('title');
var request = require('superagent');
var header = require('../header');
// var axios = require('axios');
var utils = require('../utils')

page('/', utils.loadAuth, header, loading, function (ctx, next) {
  title('Veterinaria');

  var main = document.getElementById('main-container');

 	
  empty(main).appendChild(template(ctx.appointment));
  
})

function loading (ctx, next) {
	request
		.get('/api/appointment')
		.end(function (err, res) {
			if (err) return console.log(err)

			ctx.appointment = res.body
			next()
		})
}
