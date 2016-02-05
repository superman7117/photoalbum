'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://ozannephotodrop.firebaseio.com/');

router.post('/register', function(req, res, next) {
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    var firebaseId= userData.uid
    var email = req.body.email
    console.log(email, firebaseId);
 User.create({firebaseId: firebaseId, email: email}, function(err, newUser) {
   if(err) return res.status(400).send(err);

   console.log("IM IN");
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      var token = User.generateToken();
      res.cookie('mytoken', token).send();
    });
  });
});
router.post('/resetpass', function(req, res, next) {
  var email = req.body.email
  ref.resetPassword({
    email: email
  }, function(error) {
    if (error) {
      switch (error.code) {
        case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
        default:
          console.log("Error resetting password:", error);
      }
    } else {
      console.log("Password reset email sent successfully!");
    }
  });
  res.send();
});
router.post('/changepass', function(req, res, next) {
  console.log('req.body', req.body);
  var email = req.body.email;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
ref.changePassword({
  email: email,
  oldPassword: oldPassword,
  newPassword: newPassword
}, function(error) {
  if (error) {
    switch (error.code) {
      case "INVALID_PASSWORD":
        console.log("The specified user account password is incorrect.");
        break;
      case "INVALID_USER":
        console.log("The specified user account does not exist.");
        break;
      default:
        console.log("Error changing password:", error);
    }
  } else {
    console.log("User password changed successfully!");
  }
});
  res.send();
});

// router.post('/profile', authMiddleware, function(req, res) {
//   var theme = req.body.theme;
//   User.findById(req.user._id, function(err, user) {
//     user.theme = theme;
//     user.save(function(err, saveUser){
//       console.log("saveUser",saveUser)
//       console.log("Hello!");
//       res.status(err ? 400 : 200).send(err || saveUser);
//     });
//   });
// });

router.get('/changepass', function(req, res, next) {
  res.render('changepass');
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});


module.exports = router;
