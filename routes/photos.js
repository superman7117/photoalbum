'use strict';
var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');
var Photo = require('../models/photo');

var ref = new Firebase('https://ozannephotodrop.firebaseio.com/');

var aws = require('aws-sdk');
require('dotenv').config();
var s3 = new aws.S3();
var fs = require('fs')
var mongoose = require('mongoose');
var uuid = require('node-uuid')

var multer= require('multer');
var upload = multer({ storage: multer.memoryStorage()});

router.get('/', User.isLoggedIn, function(req, res, next) {
  res.render('photopage');
});
router.post('/', User.isLoggedIn, function(req, res, next) {
  res.render('photopage');
});

router.post('/load/:albumId', function(req,res){
  console.log("Im IN",req.params.albumId);
  var albumId = req.params.albumId;
//photoOwner: albumId
  Photo.find({}, function(err, photos){
    console.log("AAlbum", photos);
    res.send({photos:photos, albumId: albumId})
  })
})
router.post('/new', upload.array('images'), function(req, res) {
  console.log('req.body', req.body);
  console.log('req.files:', req.files[0]);
    var filename = req.files[0].originalname;
    var ext = filename.match(/\.\w+$/)[0] || '';
    var key = uuid.v1()+ext;

    var params= {
      Bucket:process.env.AWS_BUCKET,
      Key: key,
      Body: req.files[0].buffer
    };
    s3.putObject(params, function(err, data){
      if(err) return console.log(err);
      console.log("DATA!!",data);
      var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
      console.log("URL:", url);
      var photo = new Photo();
      photo.photoUrl = url;
      photo.photoName = req.body.photoName;
      photo.save(function(err, savedPhoto){
        if(err) return res.send(400, err);
        res.render("albumpage");
      })
    });
  })











module.exports = router;
