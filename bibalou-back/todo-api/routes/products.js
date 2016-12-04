var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var Auth = require('../models/Authenticate.js');

router.get('/', function(req, res, next) {

  var test = {};
  test.success = true;
  test.token = "azerty";
  test.id = "azety";

  res.send(test);
});

module.exports = router;
