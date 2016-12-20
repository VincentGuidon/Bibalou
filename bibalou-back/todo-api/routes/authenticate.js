var express = require('express');
var router = express.Router();
var randomToken = require('../scripts/randomToken.js');

var User = require('../models/Users.js');

router.post('/newUser', function(req, res, next) {

  var ret = {};

  var nUser = new User({
    email : req.body.login,
    password : req.body.password
  });

  nUser.save(function(err) {
    if (err)
    {
      ret.success = false;
      ret.message = "Email already use";
      ret.errcode = 1;
      console.log('User already exist!');
    }
    else
    {
      var token = randomToken.genRandomToken(20);
      ret.success = true;
      ret.token = token;
      console.log('User saved successfully!');
    }
    res.send(ret);
  });
});

router.post('/auth', function(req, res, next) {

  var ret = {};

  User.find({email : req.body.login}, function(err, user) {
    if (err || user.length == 0 || user[0].password != req.body.password)
    {
      ret.success = false;
      ret.message = "User does not exist or wrong password!";
      ret.errcode = 2;
      res.send(ret);
    }
    else
    {
        var token = randomToken.genRandomToken(20);
        ret.success = true;
        ret.token = token;
        res.send(ret);
    }
  });
  //      ret.connect = randomToken.connectUser;

});

module.exports = router;
