var yo = require('yo-yo');
var layout = require('../layout');
var translate = require('../translate').message;
var request = require('superagent');


module.exports = function(clients, ethni ){ 

  var el
  var clientId
  var clientc 
  var ClNow = {
    fullname: '',
    email: '',
    phone: '',
    phone2: ''
  }
  var pets = [{
    fullname: '',
    race: '',
    gender: '',
    color: '',
    age: '',
    status: ''
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
                <div id="clientInfo" class="clientInfo">
              
                </div>
                <table id="petTable" css="responsive bordered">
                  <tr>
                <th>${translate('name')}</th>
                <th>${translate('race')}</th>
                <th>${translate('gender')}</th>
                <th>${translate('color')}</th>
                <th>${translate('weight')}</th>
                <th>${translate('age')}</th>
                <th>${translate('status')}</th>
                  </tr>
                  ${pets.map(function(pet){
                return petRender(pet)
              })}
                </table>
                <button class="btn-floating add btn-large waves-effect waves-light blue" onclick=${addPet}><i class="fa fa-plus"></i></button>
                <button class="btn-floating add btn-large waves-effect waves-light red left" onclick=${backToClient}><i class="material-icons">skip_previous</i></button>
              </div>
            </div>
        </div>
      </section>

      <section id="PetForm" class="hide">
        <div class="col s12 m10 offset-m1 l8 offset-l2">
          <div class="card">
              <div class="card-content">
                <form id="petForm" class="formCenter">  
                  <div class="row">
                    <div class="input-field col s12 m10 l8">
                      <input name="Pfullname" id="Pfullname" type="text" class="validate">
                      <label for="Pfullname">${translate('fullname')}</label>
                    </div>

                     <div class="input-field col s12 m10 l8">
                    <select id="ethni" onchange=${changeEthni}>
                      <option value="" disabled selected>${translate('selectText')}</option>
                      ${ethni.map(function (eth) {
                        return ethniOptions(eth)
                      })}
                    </select>
                    <label>${translate('ethnicity')}</label>
                 </div>

                 <div class="input-field col s12 m10 l8">
                  <select id="race">
                    <option value="" disabled selected>${translate('selectText')}</option>
                
                  </select>
                  <label>${translate('race')}</label>
                 </div>

                 <div class="input-field col s12 m10 l8">
                  <select id="Pgender">
                    <option value="" disabled selected>${translate('selectText')}</option>
                    <option value="M">${translate('male')}</option>
                    <option value="F">${translate('female')}</option>
                  </select>
                  <label>${translate('gender')}</label>
                 </div>

                 <div class="input-field col s12 m10 l8">
                  <input name="color" id="color" type="text" class="validate"/>
                  <label for="color">${translate('color')}</label>
                 </div>

                 <div class="input-field col s12 m10 l8">
                  <input name="borndate" id="borndate" type="text" class="validate datepicker" />
                  <label for="borndate">${translate('borndate')}</label>
                 </div>

                  <div class="input-field col s12 m10 l8">
                  <input name="weight" id="weight" type="text" class="validate" />
                  <label for="weight">${translate('weight')}</label>
                 </div>

                  <div class="col s12 m10 l8 center-align">
                  <button class="btn waves-effect waves-light" onclick=${savePet}>${translate("save")}</button>
                  <button class="btn waves-effect waves-light" onclick=${cancelPet}>${translate("cancel")}</button>
                    </div>

                  </div>
              </form>
            </div>
        </div>
      </section>
    </div> 
  </div>`
}

function clientRender (client) {
  if(client.fullname == '') {
    return yo`<tr>
          <td>${client.fullname}</td>
          <td>${client.email}</td>
          <td>${client.phone}</td>
          <td>${client.phone2}</td>
          <td></td>
          <td></td>
        </tr>`  
  }

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

function clientDataRender (cls) {
  return yo`<table>
        <tr>
          <td><strong>${translate('name')}:</strong></td>
          <td>${cls.fullname}</td>
          <td><strong>${translate('email')}:</strong></td>
          <td>${cls.email}</td>
        </tr>
        <tr>
          <td><strong>${translate('phone')}</strong></td>
          <td>${cls.phone}</td>
          <td><strong>${translate('otherPhone')}</strong></td>
          <td>${cls.phone2}</td>
        </tr>
        </table>`
}

function petRender (pet) {
  var status
  var gender
  if (pet.gender == 'M') {
    gender = 'male'
  } else {
    gender = 'female'
  }

  if (pet.alive == true) {
    status = 'ok'
  }
  else {
    status = 'death'
  }
  return yo`<tr>
          <td>${pet.fullname}</td>
          <td>${pet.raceDescription}</td>
          <td>${translate(gender)}</td>
          <td>${pet.color}</td>
          <td>${pet.weight}</td>
          <td>${pet.age}</td>
          <td>${translate(status)}</td>
        </tr>`  
}

function ethniOptions (eth) {
  return yo`<option value=${eth.id}>${eth.description}</option>`
}

function toogleButtonClient() {
  var clientFormAdd = document.getElementById('ClientFormAdd')
  var clientLists = document.getElementById('ClientLists')
  
  if (ClientLists) {
    clientFormAdd.classList.toggle('hide')
    clientLists.classList.toggle('hide')
  }
}

function toogleButtonPetClient() {
  var clientLists = document.getElementById('ClientLists')
  var petList = document.getElementById('PetList')
  
  if (ClientLists) {
      petList.classList.toggle('hide')
      clientLists.classList.toggle('hide')
    }
  }

function toogleButtonPetNClient() {
  var clientFormAdd = document.getElementById('ClientFormAdd')
  var petList = document.getElementById('PetList')
  
  if (clientFormAdd) {
      petList.classList.toggle('hide')
      clientFormAdd.classList.toggle('hide')
    }
  }

function toogleButtonPet() {
  var PetForm = document.getElementById('PetForm')
  var petList = document.getElementById('PetList')
  
  if (PetForm) {
    petList.classList.toggle('hide')
    PetForm.classList.toggle('hide')
  }
}

function saveClient(event){
  event.preventDefault()
  clientc = 1
  var select = $('select');
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

  name.value = ''
  addr.value = ''
  email.value = ''
  phone.value = ''
  phone2.value = ''
  select.prop('selectedIndex', 0)
  select.material_select()
  Materialize.updateTextFields();

  request
      .post('/api/client')
      .send(data)
      .end(function (err, res) {
        debugger
        if (err) {
          console.log(err.message)
        }
        Materialize.toast('Saved Succefull', 3000, 'rounded')
        searchPet(res.body)
  })
}

function savePet(event) {
  event.preventDefault()

  var select = $('select');
  var fullname = document.getElementById('Pfullname')
  var ethni = document.getElementById('ethni')
  var etn = document.getElementById('race')
  var gend = document.getElementById('Pgender')
  var color = document.getElementById('color')
  var weight = document.getElementById('weight')
  
  var race = etn.options[etn.selectedIndex].value
  var raceD = etn.options[etn.selectedIndex].text
  var gender = gend.options[gend.selectedIndex].value

  var $input =$('.datepicker').pickadate()
  var picker = $input.pickadate('picker') 
  var borndate = picker.get('select', 'mm/dd/yyyy')

  var petData = {
    owner: clientId,
    fullname: fullname.value,
    gender: gender,
    race: race,
    raceDescription: raceD,
    color: color.value,
    borndate: new Date(borndate),
    weight: weight.value,
    alive: true
  }

  fullname.value = ''
  color.value = ''
  weight.value = ''
  picker.set('select', new Date(), { format: 'dd/mm/yyyy' })
  select.prop('selectedIndex', 0)
  select.material_select()
  Materialize.updateTextFields();

  request
    .post('/api/pet')
    .send(petData)
    .end(function (err, res) {
      if (err) {
        Materialize.toast(err.message, 3000, 'rounded')
      }
      Materialize.toast('Saved Succefull', 3000, 'rounded')
      var table = document.getElementById('petTable')
      var newPet = petRender(res.body)
      table.appendChild(newPet)
      toogleButtonPet()
  })
  
}

function changeEthni() {
  var e = document.getElementById('ethni')
  var eth = e.options[e.selectedIndex].value 
  var raceSelect = document.getElementById('race')
  for (var x=1; x < raceSelect.length; x++) {
    raceSelect.remove(1)
  }

  request
    .get('/api/race')
    .query({ethniId : eth})
    .end(function (err, res) {
      if (err) {
        Materialize.toast(translate('raceError'), 3000, 'rounded')
      }
      var lst = res.body
      for (var y = 0; y < lst.length; y++) {
        var option = document.createElement("option");
        option.text = lst[y].description;
        option.value = lst[y].id
        raceSelect.add(option);
      }
      $('#race').material_select();
    })
}

function editClient(client) {
  clientId = client.id
  var name = document.getElementById('fullname')
  var addr = document.getElementById('address')
  var email = document.getElementById('email')
  var phone = document.getElementById('phone')
  var phone2 = document.getElementById('phone2') 
  var gender = $('#gender')

  name.value = client.fullname
  addr.value = client.address
  email.value = client.email
  phone.value = client.phone
  phone2.value = client.phone2
  gender.val(client.gender)
  
  gender.material_select();
  Materialize.updateTextFields();
  toogleButtonClient()

}

function searchPet(client) {  
  var petTable = document.getElementById('petTable')
  clientId = client.id
  ClNow = client

  var vi = document.getElementById('clientInfo')
  var clientV = clientDataRender(ClNow)
  vi.innerHTML = ''
  vi.appendChild(clientV)

  for(var i = 0; i < petTable.rows.length; i++) {
    petTable.deleteRow(1)
  }

  request
    .get('/api/pet')
    .query({owner: client.id})
    .end(function (err, res) {
      if (err) {
        Materialize.toast(err.message, 3000, 'rounded')
        if (err.message == 'Not Found') {
          if (clientc != null) {
            toogleButtonPetNClient()
            clientc = null
          }
          else {
            toogleButtonPetClient()
          }
        }
      }
      for(var y=0; y < res.body.length; y++){
        var pets = petRender(res.body[y])
        petTable.appendChild(pets)
      }
      if (clientc != null) {
            toogleButtonPetNClient()
            clientc = null
          }
          else {
            toogleButtonPetClient()
          }
    })
}

function addClient(){
  toogleButtonClient()
}

function addPet(){
  toogleButtonPet()
}

function backToClient() {
  toogleButtonPetClient()
}

function cancel() {
  clientId = null
  document.getElementById('clientForm').reset()
  document.getElementById('petForm').reset()
  toogleButtonClient()
}


function cancelPet() {
  document.getElementById('petForm').reset()
  toogleButtonPet()
}
  
el = render()

return layout(el)
}

