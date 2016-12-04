var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Auth = require('../models/Authenticate.js');

router.post('/', function(req, res, next) {
/*
  var collection = mongoose.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
*/
  console.log(req.body);
  var test = {};
  test.success = true;
  test.token = "azerty";
  test.id = "azety";

  res.send(test);
});

module.exports = router;
