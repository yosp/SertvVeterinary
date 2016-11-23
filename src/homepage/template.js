var yo = require('yo-yo');
var layout = require('../layout');
var appointment = require('../appointment-card');
var translate = require('../translate').message;
// var request = require('superagent');

module.exports = function (appointments) {
  var el = yo`<div class="container timeline">
	    <div class="row">
		      <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
					<table>
						<tr>
							<td>Estado</td>
							<td>Cliente</td>
							<td>Email</td>
							<td>Teléfono</td>
							<td>Teléfono 2</td>
							<td>Mascota</td>
							<td>Descripción</td>
							<td>Fecha cita</td>
						</tr>
						${appointments.map(function (appoint) {
							return appointment(appoint)
						})}
					</table>
		      </div>
	    </div> 
    
  </div>`;

  return layout(el);
}
