var yo = require('yo-yo');
var layout = require('../layout');
var translate = require('../translate').message;
var list = require('./list');
var request = require('superagent');


module.exports = function(clients){	

	var el;

	function render(){ 
		return yo`<div class="container timeline">
		<div class="row">
			<div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
				<div class="card">
			      <div class="card-content">
			      	<form class="col s12 m10">
				      	<div class="row">
				      		<div class="input-field offset-m1 col s5 m4">
					          <input name="uFullname" id="findname" type="text" class="validate">
					          <label for="findname">${translate('username')}</label>
					        </div>
					        <div class="input-field col s5 m4">
					          <input name="uPhone" id="findphone" type="text" class="validate">
					          <label for="findphone">${translate('username')}</label>
					        </div>
					        <div class="col s2 m2 search-button">
								<a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Buscar"><i class="fa fa-search"  aria-hidden="true"></i></a>
					        </div>
					    </div>
					</form>
							
			      	<table css="responsive bordered">
						<tr>
							<th>Nombre</th>
							<th>Email</th>
							<th>Telefono</th>
							<th>Movil</th>
							<th>Mascota</th>
							<th>Editar</th>
						</tr>
						${clients.map(function(client){
							return list(client);
						})}
					</table>

			      </div>
			    </div>
			</div>
		</div> 
	</div>`
}
	
	el = render();

	return layout(el);
}

