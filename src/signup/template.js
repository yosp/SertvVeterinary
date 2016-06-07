var yo = require('yo-yo');
var landing = require('../landing');
var translate = require('../translate');

var signupForm = yo`<div class="col s12 m7">
  <div class="row">
    <div class="signup-box">
      <h1 class="veterinariaLogo">Veterinaria</h1>
      <form class="signup-form">
        <h2>${translate.message('signup.subheading')}</h2>
        <div class="divider"></div>
        <div class="section">
          <input type="text" name="username" placeholder="${translate.message('username')}" />
          <input type="email" name="email" placeholder="${translate.message('email')}" />
          <input type="text" name="name" placeholder="${translate.message('fullname')}" />
          <input type="password" name="password" placeholder="${translate.message('password')}" />
          <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup.call-to-action')}</button>
        </div>
      </form>
    </div>
  </div>
</div>`;

module.exports = landing(signupForm);

// <div class="row">
//     <div class="login-box">
//       ${translate.message('signup.have-account')} <a href="/signin">${translate.message('signin')}</a>
//     </div>
//   </div>
