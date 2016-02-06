'use strict';

$(document).ready(init)

function init(){
  loggedInVerify()
  loadAlbums();
}

function loadAlbums(){
  console.log("in");
  $.get('/albums/load')
  .then(function(data){
    console.log(data);
  })
  .fail(function(err){
    console.log("Err",err);
  })
}

function loggedInVerify(){
  $.get('/users/signed')
  .done(function(data){
    console.log(data);
    if(data.token === false){
      $('.userhome').hide()
      $('.logoutBtn').hide()
      $('.resetpassBtn').hide()
    }
    else if(data.token === true){
      $('.registerBtn').hide()
      $('.loginBtn').hide()

    }
  })
  .fail(function(err){
    console.log('ERR',err);
  })
}
