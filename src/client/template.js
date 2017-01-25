var yo = require('yo-yo');
var layout = require('../layout');
var translate = require('../translate').message;
var list = require('./list');
var request = require('superagent');


module.exports = function(clients){	

	var el;

	function render(){ 
		return yo`<div class="timeline">
		<div class="row">
			<section id="ClientLists">
				<div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
					<div class="card">
				      <div class="card-content">
				      	<form class="col s12 m10 offset-m1 offset-s1">
					      	<div class="row">
					      		<div class="input-field offset-m1 col s10 m8">
						          <input name="uFullname" id="findname" type="text" class="validate">
						          <label for="findname">${translate('clientName')} / ${translate('phone')}</label>
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
						
						<button class="btn-floating add btn-large waves-effect waves-light red" onclick=${addClient}><i class="fa fa-plus"></i></button>
				      </div>
				    </div>
				    
				     
				</div>
			</section>
			<section id="ClientFormAdd" class="hide">
				<div class="col s12 m10 offset-m1 l8 offset-l2">
				      	<form class="formCenter">  
					      	<div class="row">
					      		<div class="input-field col s12 m10 l8">
						          <input name="Fullname" id="fullname" type="text" class="validate">
						          <label for="fullname">${translate('fullname')}</label>
						        </div>

						        <div class="input-field col s12 m10 l8">
								    <select id="gender">
								      <option value="" disabled selected>${translate('selectText')}</option>
								      <option value="m">${translate('man')}</option>
								      <option value="w">${translate('woman')}</option>
								    </select>
								    <label>Genero</label>
								 </div>

						        <div class="input-field col s12 m10 l8">
						          <input name="address" id="address" type="text" class="validate">
						          <label for="address">${translate('address')}</label>
						        </div>

						         <div class="input-field col s12 m10 l8">
						          <input name="Email" id="email" type="text" class="validate">
						          <label for="email">${translate('email')}</label>
						        </div>
								
								 <div class="input-field col s12 m10 l8">
						          <input name="Phone" id="phone" type="text" class="validate">
						          <label for="phone">${translate('phone')}</label>
						        </div>

						         <div class="input-field col s12 m10 l8">
						          <input name="OtherPhone" id="ophone" type="text" class="validate">
						          <label for="ophone">${translate('OtherPhone')}</label>
						        </div>

						        <div class="col s12 m10 l8 center-align">
									<button type="submit" class="btn waves-effect waves-light">${translate("save")}</button>
									<button type="reset" class="btn waves-effect waves-light">${translate("cancel")}</button>
						        </div>

						    </div>
						</form>
				</div>
			</section>
			
		</div> 
	</div>`
}

 function toogleButtonClient() {
    var clientFormAdd = document.getElementById('ClientFormAdd')
    var clientLists = document.getElementById('ClientLists')
    
    if (ClientLists) {
      clientFormAdd.classList.toggle('hide')
      clientLists.classList.toggle('hide')
    }
  }


function addClient(){
	toogleButtonClient()
}

function cancel() {
	alert("Listo");
  }
	
	el = render();

	return layout(el);
}

