'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var Photo;

var photoSchema = new mongoose.Schema({
  uploadedAt: {type:Date, default:Date.now},
  photoName: {type:String},
  photoUrl: {type: String}
  photoOwner: {type: mongoose.Schema.Types.ObjectId, ref: "Album"},
  description: {type:String},
});


Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
