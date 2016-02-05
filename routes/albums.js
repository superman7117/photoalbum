'use strict';
var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://ozannephotodrop.firebaseio.com/');

var aws = require('aws-sdk');
require('dotenv').config();
var s3 = new aws.S3();
var fs = require('fs')
var mongoose = require('mongoose');
var uuid = require('node-uuid')

var Image = mongoose.model('Image', {
  filename: String,
  url: String
})
var multer= require('multer');
var upload = multer({ storage: multer.memoryStorage()});

router.get('/albums', upload.array('images'), function(req, res, next) {
  res.render('albumpage');
});

mongoose.connect('mongodb://localhost/imageupload', function(err){
  if (err) return console.log(err)

var filename = "Bill and Ted Excellent!.jpg";
  fs.readFile('Bill and Ted Excellent!.jpg', function(err, data){
    if(err) return console.log("err: ",err);

    var match = filename.match(/\.\w$/);
    var ext = match ? match[0] : "";
    var key = uuid.v1() + ext;

    var picture = data;
    var params= {
      Bucket:process.env.AWS_BUCKET,
      Key:key,
      Body:picture
    };
    s3.putObject(params, function(err, data){
      if(err) return console.log(err);
      var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
      var image = new Image({
        filename: filename,
        url: url
      })
      console.log(url);
      image.save(function(){

        mongoose.disconnect();
      })
      console.log('err', err);
      console.log('data', data);
    })
  })
})

// async.each(req.files, function(file, cb){
//   s3.putObject(...., function(){
//     ....
//     image.save(function(){
//       cb()
//     });
//   });
// }, function(err){
//   res.send();
// });
module.exports = router;
