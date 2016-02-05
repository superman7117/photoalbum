'use strict';

console.log('index.js!');

$(document).ready(init);
function init(){
  hideLoginStuff()
  $("#resetPassPage").on('click', viewPassReset)
  $("#resetBtn").on('click', resetPassword)
}

function hideLoginStuff(){
  $(".registerBtn, .loginBtn").hide();
}

function viewPassReset(){
  console.log("click")
    $.get('/changepass')
    .success(function(data) {
    })
    .fail(function(err) {
      alert('Error.  Check console.');
      console.log('err:', err);
    });
}

function resetPassword(e){
  e.preventDefault();
  var emailIn = $('#email').val();
  var oldPasswordIn = $('#oldPassword').val();
  var newPasswordIn = $('#newPassword').val();
  $.post('changepass', {
    email: emailIn,
    oldPassword: oldPasswordIn,
    newPassword: newPasswordIn
  })
  .done(function(data){
    location.href = '/'
  })
}
