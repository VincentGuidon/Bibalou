var express = require('express');
var router = express.Router();

var User = require('../models/Authenticate.js');

router.post('/', function(req, res, next) {

//{ name: 'azertyu', email: 'vuc.gg@mggd.fr', password: 'zert' }
// or { name: 'azertyu', password: 'zert' }
  var nUser = new User({
    email : req.body.login,
    password : req.body.password
  })

  nUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully!');
  });

  var test = {};
  test.success = true;
  test.token = "azerty";
  test.id = "azety";

  res.send(test);
});

module.exports = router;
