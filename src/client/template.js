var yo = require('yo-yo');
var layout = require('../layout');
var translate = require('../translate').message;
var request = require('superagent');


module.exports = function(clients){	

	var el
	var clientId
	var ClNow = {
		fullname: 'Eli Segura',
		email: 'yeisp1011gmail.com',
		phone: '809-5454-4445',
		phone2: '829-662-65665'
	}
	var pets = [{
		fullname: 'Eli Segura',
		race: 'Husky',
		gender: 'F',
		color: 'Blanco, Gris, Negro',
		status: 'A'
	}]

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
								<th>${translate('name')}</th>
								<th>${translate('email')}</th>
								<th>${translate('phone')}</th>
								<th>${translate('otherPhone')}</th>
								<th>${translate('pet')}</th>
								<th>${translate('edit')}</th>
							</tr>
							${clients.map(function(client){
								return clientRender(client)
							})}
						</table>
						
						<button class="btn-floating add btn-large waves-effect waves-light red" onclick=${addClient}><i class="fa fa-plus"></i></button>
				      </div>
				    </div>
				    
				     
				</div>
			</section>
			
			<section id="ClientFormAdd" class="hide">
				<div class="col s12 m10 offset-m1 l8 offset-l2">
					<div class="card">
				      <div class="card-content">
				      	<form id="clientForm" class="formCenter">  
					      	<div class="row">
					      		<div class="input-field col s12 m10 l8">
						          <input name="Fullname" id="fullname" type="text" class="validate">
						          <label for="fullname">${translate('fullname')}</label>
						        </div>

						        <div class="input-field col s12 m10 l8">
								    <select id="gender">
								      <option value="" disabled selected>${translate('selectText')}</option>
								      <option value="M">${translate('man')}</option>
								      <option value="W">${translate('woman')}</option>
								    </select>
								    <label>${translate('gender')}</label>
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
						          <input name="OtherPhone" id="phone2" type="text" class="validate">
						          <label for="phone2">${translate('otherPhone')}</label>
						        </div>

						        <div class="col s12 m10 l8 center-align">
									<button class="btn waves-effect waves-light" onclick=${saveClient}>${translate("save")}</button>
									<button class="btn waves-effect waves-light" onclick=${cancel}>${translate("cancel")}</button>
						        </div>

						    </div>
						</form>
						</div>
					</div>
				</div>
			</section>
			
			<section id="PetList" class="hide">
				<div class="col s12 m10 offset-m1 l8 offset-l2">
					<div class="card">
				      <div class="card-content">
				      	<div class="clientInfo">
							<table>
								<tr>
									<td><strong>${translate('name')}:</strong></td>
									<td>${ClNow.fullname}</td>
									<td><strong>${translate('email')}:</strong></td>
									<td>${ClNow.email}</td>
								</tr>
								<tr>
									<td><strong>${translate('phone')}</strong></td>
									<td>${ClNow.phone}</td>
									<td><strong>${translate('otherPhone')}</strong></td>
									<td>${ClNow.phone2}</td>
								</tr>
							</table>
				      	</div>
				      	<table css="responsive bordered">
				      		<tr>
								<th>${translate('name')}</th>
								<th>${translate('race')}</th>
								<th>${translate('gender')}</th>
								<th>${translate('color')}</th>
								<th>${translate('status')}</th>
				      		</tr>
				      		${pets.map(function(pet){
								return petRender(pet)
							})}
				      	</table>
				      	<button class="btn-floating add btn-large waves-effect waves-light blue" onclick=${addPet}><i class="fa fa-plus"></i></button>
				      	<button class="btn-floating add btn-large waves-effect waves-light red left" onclick=${backToClient}><i class="fa fa-plusfa-angle-left"></i></button>
				      </div>
				    </div>
				</div>
			</section>
		</div> 
	</div>`
}

function clientRender (client) {
	return yo`<tr>
					<td>${client.fullname}</td>
					<td>${client.email}</td>
					<td>${client.phone}</td>
					<td>${client.phone2}</td>
					<td>
						<button id='seachPet' class="seachPet waves-effect waves-teal btn-flat" onclick=${searchPet.bind(this,client)} ><i class="fa fa-search" aria-hidden="true"></i></button>
					</td>
					<td>
						<a id='editClient' class="editClient waves-effect waves-teal btn-flat" onclick=${editClient.bind(this,client)}><i class="fa fa-pencil" aria-hidden="true"></i></a>
					</td>
				</tr>`	
}

function petRender (pet) {
	return yo`<tr>
					<td>${pet.fullname}</td>
					<td>${pet.race}</td>
					<td>${pet.gender}</td>
					<td>${pet.color}</td>
					<td>${pet.status}</td>
				</tr>`	
}

 function toogleButtonClient() {
    var clientFormAdd = document.getElementById('ClientFormAdd')
    var clientLists = document.getElementById('ClientLists')
    
    if (ClientLists) {
      clientFormAdd.classList.toggle('hide')
      clientLists.classList.toggle('hide')
    }
  }

function saveClient(){
	var name = document.getElementById('fullname')
	var addr = document.getElementById('address')
	var email = document.getElementById('email')
	var phone = document.getElementById('phone')
	var phone2 = document.getElementById('phone2') 
	var g = document.getElementById('gender')
	var gender = g.options[g.selectedIndex].value 

	if(clientId != null || clientId != undefined) {
		var data = {
			id: clientId,
			fullname: name.value,
			address: addr.value,
			email: email.value,
			phone: phone.value,
			phone2: phone2.value,
			gender: gender
		}
	}
	else {
		var data = {
			fullname: name.value,
			address: addr.value,
			email: email.value,
			phone: phone.value,
			phone2: phone2.value,
			gender: gender
		}
	}

	request
      .post('/api/client')
      .send(data)
      .end(function (err, res) {
        if (err) {
          console.log(err.message)
        }
        Materialize.toast('Saved Succefull', 3000, 'rounded')
        searchPet(res.body)
      })
}

function editClient(client) {
	clientId = client.id
	var name = document.getElementById('fullname')
	var addr = document.getElementById('address')
	var email = document.getElementById('email')
	var phone = document.getElementById('phone')
	var phone2 = document.getElementById('phone2') 
	var gender = document.getElementById('gender')

	name.value = client.fullname
	addr.value = client.address
	email.value = client.email
	phone.value = client.phone
	phone2.value = client.phone2
	gender.value = client.gender
	
	$('select').material_select();
	Materialize.updateTextFields();
	toogleButtonClient()
}

function searchPet(client) {
	var clientLists = document.getElementById('ClientLists')
	var petList = document.getElementById('PetList')
	
	if (ClientLists) {
      petList.classList.toggle('hide')
      clientLists.classList.toggle('hide')
    }
}

function addClient(){
	toogleButtonClient()
}

function addPet(){
	
}

function backToClient() {
	document.getElementById('clientForm').reset()
}

function cancel() {
	clientId = null
	document.getElementById('clientForm').reset()
	toogleButtonClient()
  }
	
	el = render();

	return layout(el);
}

