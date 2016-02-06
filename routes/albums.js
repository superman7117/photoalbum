'use strict';
var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');
var Photo = require('../models/photo')
var User = require('../models/user');
var Album = require('../models/album');

var ref = new Firebase('https://ozannephotodrop.firebaseio.com/');

var aws = require('aws-sdk');
require('dotenv').config();
var s3 = new aws.S3();
var fs = require('fs')
var mongoose = require('mongoose');
var uuid = require('node-uuid')

var multer= require('multer');
var upload = multer({ storage: multer.memoryStorage()});
var Photo;

router.get('/', function(req, res, next) {
  res.render('albumpage');
});

router.get('/load', User.isLoggedIn, function(req,res,next){
  console.log('req.token', req.token);
  Album.find({albumOwner: req.token._id}, function(err, albumData){
    if (err) return res.send("can't find album");
    console.log("erherherer",albumData);
    res.send(albumData);
  })
})
router.post('/', upload.array('images'), function(req, res) {
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
        res.render("photopage");
      })
    });
  })

router.post('/newalbum', User.isLoggedIn, function(req,res){
  console.log('req.body', req.body);
  Album.create({name: req.body.albumName, albumOwner: req.token._id}, function(err, album){
    if(err) return console.log(err);
    res.render('albumpage')
  })
})
module.exports = router;
