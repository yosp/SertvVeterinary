var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var request = require('superagent')
var utils = require('../utils')

page('/client', utils.loadAuth, header, loadClients, function(ctx, next){
	title('Veterinaria - Clientes');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.clients));
	$('select').material_select();
});


function loadClients(ctx, next) {
  request
    .get('/api/client')
    .end(function (err, res) {
      if (err) return console.log(err)
      ctx.clients = res.body
      next()
    })
}