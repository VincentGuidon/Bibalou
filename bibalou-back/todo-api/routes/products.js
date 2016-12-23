var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require("async");

var Product = require('../models/Products.js');
var Market = require('../models/Markets.js');
var Promotion = require('../models/Promotions.js');

router.delete('/:id', function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, function(err, promo)
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
  console.log(body);
  Product.findByIdAndUpdate(req.params.id, body, function (err) {
    if (err)
    {
      res.send({success : false, message : 'No product with that name', errcode : 4});
    }
    else {
        res.send({success:true});
    }
  });
});

router.get('/', function(req, res, next) {
  Product.find(function (err, todos) {
    if (err)
    {
        res.send({success : false, message : 'Internal Error',errcode : 0});
    }
    res.json(todos);
  });
});

router.get('/byName', function(req, res, next) {
  Product.find({name : req.query.name}, function(err, products) {
    if (err)
    {
      res.send({success : false, message : 'No product with that name',errcode : 6});
    }
    else
    {
      var ret = {};

      ret.success = true;
      ret.products = products;
      res.send(ret);
    }
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
      res.send({success:false});
    }
    Market.findOne({name : marketPlaceName}, function(err, market) {
      if (err)
      {
        res.send({success : false, message : 'No marketPlace with that ID', errcode : 5});
      }
      else
      {
      market.productList.push(newProduct.id);
      Market.findOneAndUpdate({name : marketPlaceName}, market, function(err) {
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
});

module.exports = router;
