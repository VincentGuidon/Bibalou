  var express = require('express');
var router = express.Router();

var Market = require('../models/Markets.js');
var Product = require('../models/Products.js');
var Promotion = require('../models/Promotions.js');

var randomToken = require('../scripts/randomToken.js');

router.put('/addNews', function(req, res, next) {
//id
//value
//{$push : {promotions : newPromo.id }},
  var id = req.body.id;
  var val = req.body.value;
  Market.findByIdAndUpdate(id, {$push : {news : val }}, function(err, market) {
      if (err)
      {
        res.send({success : false, message : 'Internal error', errcode : 7})
      }
      else
      {
        console.log(id + ' ' + val);
        res.send({success : true});
      }
  });
});

/*
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
});*/

router.put('/', function(req, res, next) {
  Market.findByIdAndUpdate(req.query.id, req.body, function (err) {
    if (err)
    {
      res.send({success : false, message : 'No marketPlace with that name', errcode : 4});
    }
    else {
        res.send({success:true});
    }
  });
});

function getAllMarket(ret, res, market)
{
  Product.find({ _id : { $in : market[0].productList}}, function(err, products) {
    if (err)
    {
        res.send({success : false, message : 'No marketPlace with that name', errcode : 4});
    }
    else
    {

      ret.market.productList = products;
      Promotion.find({ _id : { $in : market[0].promotions}}, function(err, promo) {
          if (err)
          {
            res.send({success : false, message : 'No marketPlace with that name', errcode : 4});
          }
          else
          {
            ret.market.promotions = promo;
            res.send(ret);
          }
      });
    }
  })
}

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
//market, ret, res
        getAllMarket(ret, res, market);
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
        getAllMarket(ret, res, market);
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
