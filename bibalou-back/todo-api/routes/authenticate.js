var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Auth = require('../models/Authenticate.js');

router.post('/', function(req, res, next) {

//{ name: 'azertyu', email: 'vuc.gg@mggd.fr', password: 'zert' }
// or { name: 'azertyu', password: 'zert' }
  console.log(req.body);
  var test = {};
  test.success = true;
  test.token = "azerty";
  test.id = "azety";

  res.send(test);
});

module.exports = router;
