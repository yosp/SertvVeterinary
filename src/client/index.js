var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var utils = require('../utils')

page('/client', utils.loadAuth, header, function(ctx, next){
	title('Veterinaria - Clientes');

	var main = document.getElementById('main-container');

	var clients = [{
		fullname: 'Yeison Segura',
		email: 'yeisp1011@gmail.com',
		phone: '809-223-5563',
		phone2: '829-926-6545',
	},
	{
		fullname: 'Juan Ramirez',
		email: 'Juanra@gmail.com',
		phone: '809-223-5543',
		phone2: '829-926-6545',
	}
	];

	empty(main).appendChild(template(clients));
});
