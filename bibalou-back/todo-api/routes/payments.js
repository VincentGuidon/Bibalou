var express = require('express');
var router = express.Router();

var Payments = require('../models/Payments.js');

router.get('/', function(req, res, next) {
//  console.log(Payments.findPaymentById(0));
  res.send({success : true, 'payments' : Payments.Payments()});
});

module.exports = router;
