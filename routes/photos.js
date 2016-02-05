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

var multer= require('multer');
var upload = multer({ storage: multer.memoryStorage()});
router.get('/', function(req, res, next) {
  res.render('photopage');
});
router.post('/', function(req, res, next) {
  res.render('photopage');
});











module.exports = router;
