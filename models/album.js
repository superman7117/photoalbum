'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var User = require('../models/user.js');

var JWT_SECRET = process.env.JWT_SECRET;

var Album;
var albumSchema = new mongoose.Schema({
  albumOwner:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  createdAt: { type: Date, default: Date.now },
  name: String,
});


Album = mongoose.model('Album', albumSchema);

module.exports = Album;
