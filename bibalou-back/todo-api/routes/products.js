var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = require('../models/Products.js');
var Market = require('../models/Markets.js');

/*
  get - /byMarketId
  get - /byName
  ajotuer nom marketPlaces
  ajouter reduction
  ajouter productType
*/

router.get('/', function(req, res, next) {
  Product.find(function (err, todos) {
    if (err)
    {
        res.send({success : false, message : 'Internal Error',errcode : 0});
    }
    res.json(todos);
  });
});

router.get('/byMarketId', function(req, res,next) {
  Product.find({marketPlace : req.query.marketId}, function(err, products) {
    if (err)
    {
      res.send({success : false, message : 'No marketPlace with that ID',errcode : 5});
    }
    else
    {
      var ret = {};
      ret.success = true;
      ret.products = products
      res.send(ret);
    }
  });
//  console.log(req.query);
})

router.post('/', function(req, res, next) {

  var marketPlaceName = req.body.marketPlace;
  var nProduct = new Product({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,

    stock : req.body.stock,
    available : req.body.available,
    image : req.body.image,
    type : req.body.type,
    marketPlace : marketPlaceName
  });

  nProduct.save(function(err, newProduct) {
    if (err)
    {
      res.send({Success:false});
    }
    Market.findOne({name : marketPlaceName}, function(err, market) {
      if (err)
      {
        res.send({success : false, message : 'No marketPlace with that ID',errcode : 5});
      }
      else
      {
      market.productList.push(newProduct.id);
      Market.findOneAndUpdate({name : marketPlaceName},market, function(err) {
        if (err)
          {
            res.send({success : false, message : 'Couldn\'t save the product', errcode : 5});
          }
          else
          {
            res.send({success : true});
          }
        });
      }
    });
    console.log('Product saved successfully!');
  });

//  res.send({Success:true});
});

module.exports = router;
