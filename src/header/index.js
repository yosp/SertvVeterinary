var yo = require('yo-yo');
var empty = require('empty-element');

var authCard = function (ctx) {
    var authenticated = yo`
    <div class="col s2 offset-s9 m6 offset-m6 right-align">
      <a href="#" class="btn btn-large btn-flat dropdown-button" data-activates="drop-user">
        <i class="fa fa-user" aria-hidden="true"></i>
        ${ctx.auth.name}
      </a>
      <ul id="drop-user" class="dropdown-content">
        <li><a href="/logout" rel="external">logout</a></li>
      </ul>
    </div>
  `
  var signin = yo`
    <div class="col s2 offset-s9 m6 offset-m6 right-align">
      <a href="/signin" class="btn btn-large btn-flat">
       signin
      </a>
    </div>
  `

  if (ctx.auth) {
    return authenticated
  } else {
    return signin
  }
}

var renderHeader = function (ctx) {
  return yo`<nav class="header">
      <div class="nav-wrapper">
        <div class="container">
          <div class="row">
            <div class="col s12 m6">
              <a href="/" class="brand-logo veterinariaLogo">Veterinaria</a>
            </div>
              ${authCard(ctx)}
            </div>
          </div>
        </div>
      </div>
    </nav>`;
}

module.exports = function header (ctx, next) {
  var container = document.getElementById('header-container')
  empty(container).appendChild(renderHeader(ctx));
  $('.dropdown-button').dropdown();
  next();
}


// var yo = require('yo-yo');
// var empty = require('empty-element');

// var el = yo`<nav class="header grey lighten-2">
//       <div class="nav-wrapper">
//         <div class="container">
//           <div class="row">
//             <div class="col s12 m6 offset-m1">
//               <a href="/" class="brand-logo veterinariaLogo">Veterinaria</a>
//             </div>
//             <div class="col s2 m6 push-s10 push-m10">
//               <a href="#" class="btn btn-large btn-flat dropdown-button" data-activates="drop-user">
//                 <i class="fa fa-user" aria-hidden="true"></i>
//               </a>
//               <ul id="drop-user" class="dropdown-content">
//                 <li><a href="#">${translate.message('logout')}</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>`;



// module.exports = function header (ctx, next) {
//   var container = document.getElementById('header-container')
//   empty(container).appendChild(el);
//   next();
// }