'use strict';
$(document).ready(init)
var $email, $password, $password2;

function init(){
  hidelogout()
  $email = $('#email');
  $password = $('#password');
  $password2 = $('#password2');
  $('form').on('submit', registerUser);
}

function hidelogout(){
  $(".resetpassBtn, .logoutBtn").hide();
}

function registerUser(e) {
  e.preventDefault();

  var email = $email.val();
  var password = $password.val();
  var password2 = $password2.val();

  if(password !== password2) {
    $('.password').val('');
    return alert('Passwords must match.');
  }

  $.post('/users/register', {email: email, password: password})
  .success(function() {
    location.href = '/login';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}
