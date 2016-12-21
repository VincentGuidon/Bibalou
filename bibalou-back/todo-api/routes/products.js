var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = require('../models/Products.js');
//var Auth = require('../models/Authenticate.js');

/*
  get - /byMarketId
  get - /byName
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

router.post('/', function(req, res, next) {

  var nProduct = new Product({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,

    stock : req.body.stock,
    available : req.body.available,
    image : req.body.image,
    type : req.body.type
  })

  nProduct.save(function(err) {
    if (err)
    {
      res.send({Success:false});
    }
    console.log('Product saved successfully!');
  });

  res.send({Success:true});
});

module.exports = router;
