var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var request = require('superagent')
var utils = require('../utils')

page('/client', utils.loadAuth, header, loadClients, loadEtnies, function(ctx, next){
	title('Veterinaria - Clientes');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.clients, ctx.etni));
	
	$('select').material_select();
	
	var $input = $('.datepicker').pickadate()
	var picker = $input.pickadate('picker', { editable: true })
	picker.set('select', new Date(), { format: 'dd/mm/yyyy' })
});


function loadClients(ctx, next) {
  request
    .get('/api/client')
    .end(function (err, res) {
      if (err) return Materialize.toast(err.message, 3000, 'rounded')
      ctx.clients = res.body
  	  if (ctx.clients.length == 0) {
  	  	ctx.clients = [{
  	  		id: '',
  	  		fullname: '',
  	  		email: '',
  	  		phone: '',
  	  		phone2: ''
  	  	}]
  	  }
      next()
    })
}

function loadEtnies(ctx, next) {
	request
		.get('/api/etni')
		.end(function (err, res) {
			if (err) {
				Materialize.toast(err.message, 3000, 'rounded')
			}
			ctx.etni = res.body
			next()
		})
}