var yo = require('yo-yo');
var layout = require('../layout');
var translate = require('../translate').message;


module.exports = function(client){
	var el = yo`<tr>
					<td>${client.fullname}</td>
					<td>${client.email}</td>
					<td>${client.phone}</td>
					<td>${client.phone2}</td>
					<td class="row-button">
						<a class="waves-effect waves-teal btn-flat"><i class="fa fa-search" aria-hidden="true"></i></a>
					</td>
					<td class="row-button">
						<a class="waves-effect waves-teal btn-flat"><i class="fa fa-pencil" aria-hidden="true"></i></a>
					</td>
				</tr>`	

	return el;

}