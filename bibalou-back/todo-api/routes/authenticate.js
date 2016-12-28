var express = require('express');
var router = express.Router();
var randomToken = require('../scripts/randomToken.js');

var User = require('../models/Users.js');

router.post('/register', function(req, res, next) {

  var ret = {};
  var nUser = new User({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    image : req.body.image
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
      ret.success = true;
      console.log('User saved successfully!');
    }
    res.send(ret);
  });
});

router.post('/auth', function(req, res, next) {

  var ret = {};
  User.find({email : req.body.email}, function(err, user) {
    if (err || user.length == 0 || user[0].password != req.body.password)
    {
      ret.success = false;
      ret.message = "User does not exist or wrong password!";
      ret.errcode = 2;
      res.send(ret);
    }
    else
    {
        var token = randomToken.genRandomToken(20, req.body.email, user[0]._id);
      console.log("NEW RANDOM TOKEN: ", token)
        ret.success = true;
        ret.token = token;
        ret.id = user[0]._id;
        res.send(ret);
    }
  });
});

router.post('/disconnect', function(req, res, next) {

  if (randomToken.removeToken(req.query.token)) {
    res.send({success: true, message: 'User disconnect.', errcode: 10});
  } else {
    res.send({success: false, message: 'No user find.', errcode: 10});
  }
});

module.exports = router;
