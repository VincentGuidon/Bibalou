var express = require('express');
var router = express.Router();
var Market = require('../models/Markets.js');
var randomToken = require('../scripts/randomToken.js');

/*
  get / - name=name
  post / - token=token
  put /
*/

router.get('/byName', function(req, res, next) {

  var ret = {};

  Market.find({name : req.query.name}, function(err, market){
      if (err)
      {
        ret.success = false;
        ret.message = "Market Place unknow";
        ret.errcode = 4;
        console.log('Can\'t find the MarketPlace');
      }
      else
      {
        ret.success = true;
        ret.market = market[0];
        res.send(ret);
      }
  });
});


router.get('/byOwner', function(req, res, next) {

  var ret = {};

  Market.find({owner : req.query.id}, function(err, market){
      if (err)
      {
        ret.success = false;
        ret.message = "Market Place unknow";
        ret.errcode = 4;
        console.log('Can\'t find the MarketPlace');
      }
      else
      {
        ret.success = true;
        ret.market = market[0];
        res.send(ret);
      }
  });
});
//ajouter marketplace dans le user
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

  newMarket.save(function(err, market) {
    if (err)
    {
      ret.success = false;
      ret.message = "Market already created";
      ret.errcode = 3;
      console.log('Market already exist!');
      console.log(market);
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
