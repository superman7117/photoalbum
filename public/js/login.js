'use strict';

var $email, $password;

$(function() {
  $email = $('#email');
  $password = $('#password');
  $('form').on('submit', loginUser);
});

function loginUser(e) {
  e.preventDefault();
  var email = $email.val();
  var password = $password.val();
  console.log(email, password);
  $.post('/users/login', {email: email, password: password})
  .success(function(data) {
    location.href = '/user';
      $.get('/user')
      .done()
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}
