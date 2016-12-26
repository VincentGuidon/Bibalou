var express = require('express');
var router = express.Router();

var Order = require('../models/Order.js');


router.get('/byMarket', function(req, res, next) {

});

router.get('/byUser', function(req, res, next) {

});

router.post('/', function(req, res, next) {

  newOrder = new Order({
    products : JSON.parse(req.body.products),
    payment : req.body.payment,
    owner : req.body.owner,
    market : req.body.market,
    buyer  : req.body.buyer
  });
  newOrder.save(function(err) {
    if (err)
    {
      res.send({success:false, fail:err});
    }
    else {
       res.send({success:true});
    }
  });

});

module.exports = router;
