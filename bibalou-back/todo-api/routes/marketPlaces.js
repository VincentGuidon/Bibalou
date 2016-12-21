var express = require('express');
var router = express.Router();
var Market = require('../models/Markets.js');
var randomToken = require('../scripts/randomToken.js');

/*
  get / - name=name
  post / - token=token
  put /
*/

router.post('/', function(req, res, next) {

  var ret = {};
  var user = randomToken.findUserConnected(req.body.token);

  var newMarket = new Market({
    name : req.body.name,
    description : req.body.description,
    productList : [],
    owner : user.id,
    order : [],
    image : req.body.image
  });

  newMarket.save(function(err) {
    if (err)
    {
      ret.success = false;
      ret.message = "Market already created";
      ret.errcode = 3;
      console.log('Market already exist!');
    }
    else
    {
      ret.success = true;
      console.log('MarketPlace saved successfully!');
    }
    res.send(ret);
  });
});

module.exports = router;
