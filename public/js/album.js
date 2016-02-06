'use strict';

$(document).ready(init)

function init(){
  loadAlbums();
  $('.dude').on('click', grabPhotosPage)
}

function grabPhotosPage(e){
  var _id = $(e.target).attr('id')
  console.log("_id", _id);
  $.post('/photos/load/'+_id)
  .done(function(data){
    $('.photodrop').attr('id', data.albumId)
    // location.href = '/photos';
    var thing = data.photos;
    console.log("thing", thing);
    var catchPhotos =thing.map(function(x){
      console.log(x.photoUrl);
      $('<img>').addClass('showImage').text(x.photoName).css({'background-image': 'url("'+x.photoUrl+'")'}).appendTo(".photoholder")
    })

  })
  .fail(function(err){
    console.log(err);
  })
}


function loadAlbums(){
  console.log("in");
  $.get('/albums/load')
  .then(function(data){
    $(".dude").empty();
    console.log('type of',data);
    var catchAlbums =data.map(function(x){

      $('<a>').attr('id', x._id).text(x.name).appendTo(".dude")
    })
  })
  .fail(function(err){
    console.log("Err",err);
  })
}
