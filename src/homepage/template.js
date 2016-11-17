var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../picture-card');
var translate = require('../translate').message;
// var request = require('superagent');

module.exports = function (pictures) {
  var el = yo`<div class="container timeline">
    <div class="row">
	      ${pictures}
    </div> 
    
  </div>`;

  return layout(el);
}