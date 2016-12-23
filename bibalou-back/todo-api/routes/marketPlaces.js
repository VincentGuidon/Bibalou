var express = require('express');
var router = express.Router();
var Market = require('../models/Markets.js');
var randomToken = require('../scripts/randomToken.js');

router.delete('/:name', function(req, res, next) {
  Market.findOneAndRemove(req.params.name, function(err, promo)
    {
      if (err)
      {
        res.send({success : false, message : 'Internal error',errcode : 7});
      }
      else
      {
        res.send({sucees : true});
      }
    });
});

router.put('/:id', function(req, res, next) {
  var body = req.body;
  delete body.token;
  Market.findOneAndUpdate({name : req.params.id}, body, function (err) {
    if (err)
    {
      res.send({success : false, message : 'No marketPlace with that name', errcode : 4});
    }
    else {
        res.send({success:true});
    }
  });
});

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
