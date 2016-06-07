var yo = require('yo-yo');
var landing = require('../landing');
var translate = require('../translate');

var signinForm = yo`<div class="col s12 m7">
  <div class="row">
    <div class="signup-box">
      <h1 class="veterinariaLogo">Veterinaria</h1>
      <form class="signup-form">
        <div class="divider"></div>
        <div class="section">
          <input type="text" name="username" placeholder="${translate.message('username')}" />
          <input type="password" name="password" placeholder="${translate.message('password')}" />
          <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup.text')}</button>
        </div>
      </form>
    </div>
  </div>

</div>`;

module.exports = landing(signinForm);

  // <div class="row">
  //   <div class="login-box">
  //     ${translate.message('signin.not-have-account')} <a href="/signup">${translate.message('signup.call-to-action')}</a>
  //   </div>
  // </div>