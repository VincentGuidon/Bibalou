var express = require('express');
var router = express.Router();
var Market = require('../models/Markets.js');
var randomToken = require('../scripts/randomToken.js');

/*

*/

router.post('/newMarket', function(req, res, next) {

  randomToken.findUserConnected();

  res.send("");
});

module.exports = router;
